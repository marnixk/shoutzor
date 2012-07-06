module Indexer

	#
	#  This class container the necessary elements to control the player
	#
	class Daemon

		@@running = true

		attr_accessor :indexer

		#
		#  Jukebox cycle
		#
		def daemonize(skip_index_check = false)

			# initialize vars
			@indexer = Indexer::Indexer.new("/home/marnix/Music/")

			begin
				if not skip_index_check then
					@indexer.index_check
				end
				@indexer.listen_for_change

				# # make music cycle run every second inside a thread
				@thread = Thread.fork do |p|
					while @@running
						sleep 1 
						Rails.logger.flush
					end
				end
			rescue => e
				Rails.logger.info e.exception
				Rails.logger.info e.backtrace.join("\n")
			ensure 
				ActiveRecord::Base.verify_active_connections!()
			end
		end

		#
		#  Make the jukebox stop
		#
		def stop!
			@@running = false
			@thread.join
		end

	end

end