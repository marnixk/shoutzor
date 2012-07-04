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
		def daemonize

			# initialize vars
			@indexer = Indexer::Indexer.new("/home/marnix/Music/")

			begin
				@indexer.index_check
				@indexer.listen_for_change

				# # make music cycle run every second inside a thread
				@thread = Thread.fork do |p|
					while @@running
						sleep 1 
						Rails.logger.flush
					end
				end
			rescue => e
				Rails.logger e.exception
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