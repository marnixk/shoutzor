module Indexer

	class Library


		def initialize(analyzer) 
			@analyzer = analyzer
		end
		
		#
		#  Has been indexed?
		#
		def indexed?(file)
			Song.where(:file => file).count > 0
		end

		#
		#  Add to library
		# 
		def add_to_library(files)
			files = Array(files)
			files.each do |file|
				song = @analyzer.analyze(file)
				song.save
			end
		end
		
		#
		#  Remove from library
		#
		def remove_from_library(files)
			files = Array(files)
			Song.where(:file => files).all.delete
		end

	end


end
