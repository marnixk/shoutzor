class Song < ActiveRecord::Base

	attr_accessible :title, :description, :file, :last_played, :track
  	
	has_many :votes


	#
	# Search the list of songs
	#
	def search_list
		[]
	end
end
