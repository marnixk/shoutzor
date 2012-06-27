class Song < ActiveRecord::Base

	attr_accessible :title, :album, :file, :last_played, :track, :artist
  	
	has_many :votes

	scope :random_song, lambda { order("RANDOM()").limit(1) }

	#
	# Get the last added songs
	#
	def self.added_last(count) 
		Song.order("created_at DESC").limit(count).all
	end

	#
	# Search the list of songs
	#
	def search_list
		[]
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
