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
			puts "adding: #{files}"
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
			if not files.empty? then
				Song.where(:file => files).delete_all
			end

		end

	end


end
