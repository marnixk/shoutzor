class Song < ActiveRecord::Base

	attr_accessible :title, :album, :file, :last_played, :track, :artist, :length
  	
	has_many :votes

	# get a randoms ong
	scope :random_song, lambda { order("RANDOM()").limit(1) }

	# search for song with specific text
	scope :search, lambda { |q| where("title LIKE ? or artist LIKE ? or album LIKE ?", "%#{q}%", "%#{q}%", "%#{q}%") }

	def self.autocomplete_for(term)
		result = []
		labels = {
			:title => "by Track title",
			:artist => "by Artist",
			:album => "by Album"
		}
		[:title, :artist, :album].each do |field|
			result += [{:type => "label", :label => labels[field]}]
			songs = Song.where("#{field} LIKE ?", "#{term}%").limit(5)
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

end
