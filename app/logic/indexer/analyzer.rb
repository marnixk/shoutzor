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

			fileref = TagLib::FileRef.new(file, false)
			tags = fileref.tag

			# return song instance
			Song.new({ 	:file => file, 
						:title => tags.title, 
						:artist => tags.artist, 
						:album => tags.album, 
						:track => tags.track})
		end

	end

end
