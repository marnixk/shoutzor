module Player

	#
	#  This class container the necessary elements to control the player
	#
	class Daemon

		@@running = true

		attr_accessor :jukebox
		
		#
		#  Jukebox cycle
		#
		def daemonize

			# initialize vars
			volume = Player::VolumeControl.new
			player = Player::MusicControl.new
			@jukebox = Player::Jukebox.new(volume, player)

			# make music cycle run every second inside a thread
			@thread = Thread.fork do |p|
				begin
					while @@running
						@jukebox.music_cycle
						sleep 1 
					end
					@jukebox.stop
				ensure
					Rails.logger.flush
				end
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