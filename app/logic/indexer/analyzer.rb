require 'taglib'

module Indexer


	class Analyzer


		#
		#   Has any of the permitted extensions?
		#
		def should_index?(file)
			[".mp3", ".ogg"].include?(File.extname(file))
		end



		#
		#  Analyze the file
		#
		def analyze(file)

			fileref = TagLib::FileRef.new(file, true)
			tags = fileref.tag
			properties = fileref.audio_properties

			# return song instance
			Song.new({ 	:file => file, 
						:title => tags.title || "Untitled", 
						:artist => tags.artist || "Unknown artist", 
						:album => tags.album || "Unknown album", 
						:track => tags.track == 0 ? nil : tags.track,
						:length => tracklength(properties) })
		end

		protected

			def tracklength(properties) 

				if not properties.nil? then
					properties.length
				else
					-1
				end

			end

	end

end
