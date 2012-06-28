module Indexer

	# 
	# Listens to changes
	#	
	class Indexer

		attr_accessor :listener

		def initialize(listen_to)
			@analyzer = Analyzer.new
			@library = Library.new(@analyzer)
			@listen_to = listen_to
		end

		#
		#  Do a full index check
		#
		def index_check
			Rails.logger.info "Starting full index check"

			Dir.glob(@listen_to + "/*/**") do |f|
				if @analyzer.should_index?(f) and not @library.indexed?(f) then
					song = @analyzer.analyze(f)
					song.save
					Rails.logger.info "Saved: #{song.file}"
				end
			end

			Rails.logger.info "Completed full index check"

		end

		#
		#  Start monitoring
		#
		def listen_for_change

			Rails.logger.info "Listening for changes"

			something_changed = Proc.new do |modified, added, removed|
				Rails.logger.info "Detected changes"
				@library.remove_from_library(removed)
				@library.add_to_library(added)
			end

			@listener = Listen.to(@listen_to)

			@listener.change(&something_changed)
			@listener.latency(1)

			# start listener in the background
			@listener.start false
		end

		def self.instance
			$indexer_daemon.indexer
		end


	end


end