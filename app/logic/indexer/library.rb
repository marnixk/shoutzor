module Indexer

	class Library


		def initialize(analyzer) 
			@analyzer = analyzer
		end
		
		#
		#  Has been indexed?
		#
		def indexed?(file)
			crc = Digest::MD5.hexdigest(File.read(file))
			new_crc = Song.where(:crc => crc).count == 0 
			Song.where(:file => file).count > 0 || (not new_crc)
		end

		#
		#  Add to library
		# 
		def add_to_library(files)
			files = Array(files)
			Rails.logger.info "adding: #{files}"
			files.each do |file|
				if not indexed?(file) then
					song = @analyzer.analyze(file)
					song.save
				else
					Rails.logger.info "Already indexed '#{file}', skipping"
				end
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
