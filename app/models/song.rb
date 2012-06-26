class Song < ActiveRecord::Base

	attr_accessible :title, :album, :file, :last_played, :track
  	
	has_many :votes

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
end
