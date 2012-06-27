module Indexer

	# 
	# Listens to changes
	#	
	class Indexer

		attr_accessor :listener

		def initialize(listen_to)
			@analyzer = Analyzer.new
			@listen_to = listen_to
		end

		#
		#  Do a full index check
		#
		def index_check
			Rails.logger.info "Starting full index check"

			Dir.glob(@listen_to + "/**") do |f|
				if should_index?(f) and not indexed?(f) then
					song = @analyzer.analyze(f)
					song.save
					Rails.logger.info "Saved: #{song.file}"
				end
			end

		end

		#
		#  Start monitoring
		#
		def listen_for_change

			Rails.logger.info "Listening for changes"

			@listener = Listen.to(Array(listen_to))
			@listener.change(&something_changed)
			@listener.latency = 1
			@listener.filter([ /\.mp3$/, /\.ogg$/ ])

			# start listener in the background
			@listener.start(false)
		end


		#
		#  Handler for when something changed
		#
		def something_changed(modified, added, removed)
			Rails.logger.info "modified: #{modified.inspect}"
			Rails.logger.info "added: #{added.inspect}"
			Rails.logger.info "removed: #{removed.inspect}"
		end

		#
		#  Has been indexed?
		#
		def indexed?(file)
			Song.where(:file => file).count > 0
		end


		def add_to_library(file)
			song = @analyzer.analyze(file)
			song.save
		end


	end


end