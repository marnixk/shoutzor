module Indexer


	class Analyzer

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
