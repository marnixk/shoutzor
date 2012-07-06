class Song < ActiveRecord::Base

	MaxWaitUntilSongAgain = 1.hour

	attr_accessible :title, :album, :file, :last_played, :track, :artist, :length, :crc
  	
	has_many :votes

	# get history
	scope :history, proc { order("last_played DESC").limit(10) }

	# get a randoms ong
	scope :random_song, lambda { order("RANDOM()").limit(1) }

	# search for song with specific text
	scope :search_all, lambda { |q| where("title LIKE ? or artist LIKE ? or album LIKE ?", "%#{q}%", "%#{q}%", "%#{q}%") }

	# search for a song with text in field
	scope :search_by, lambda { |q, field| where("#{field} LIKE ?", "%#{q}%") }

	#
	#  Determine whether we can vote for this song
	#
	def can_vote?
		self.last_played.nil? or self.last_played < Time.now - MaxWaitUntilSongAgain
	end

	def self.autocomplete_for(term)
		result = []
		labels = {
			:title => "... by title",
			:artist => "... by artist",
			:album => "... by album"
		}
		[:artist, :album, :title].each do |field|
			result += [{:type => "label", :label => labels[field]}]
			songs = Song.where("#{field} LIKE ?", "#{term}%").group(field).limit(5)
			result += songs.map { |s| { :type => "term", :by => field, :term => s[field]} }
		end

		result
	end

	#
	# Get the last added songs
	#
	def self.added_last(count) 
		Song.order("created_at DESC").limit(count).all
	end

	#
	#   Get the next song
	#
 	def self.next_song
		votes = Vote.fresh.order("created_at ASC").limit(1).all

		# there is a next vote
		if votes.length > 0 then
			next_vote = votes.first
			song = next_vote.song
			
			# vote has been processed
			next_vote.handled = true
			next_vote.save

			return song
		else
			# get a random song
			Song.random_song.all.first
		end

	end

	#
	# To json
	#
	def to_json
		{ 
			:title => self.title, 
			:album => self.album, 
			:artist => self.artist, 
			:length => self.length ? format_time(length) : 'n/a',
			:id => self.id 
		}
	end

	def format_time(length)
		if length.seconds > 1.hour then 
			Time.at(self.length).strftime("%H:%M:%S")
		else
			Time.at(self.length).strftime("%M:%S")
		end

	end

end
