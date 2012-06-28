class SongDecorator < Draper::Base

	decorates :song

	#
	#  Generate track length
	#
	def track_length
		if not self.length.blank? then
			Time.at(self.length).strftime("%M:%S")
		else
			"n/a"
		end
	end

end
