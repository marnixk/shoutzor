class SongDecorator < Draper::Base

	decorates :song

	#
	#  Generate track length
	#
	def track_length
		Time.at(self.length).strftime("%M:%S")
	end

end
