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
		def daemonize(play_music)

			# initialize vars
			volume = Player::VolumeControl.new
			player = Player::MusicControl.new(play_music)
			@jukebox = Player::Jukebox.new(volume, player)

			# make music cycle run every second inside a thread
			@thread = Thread.fork do |p|
				begin
					while @@running

						if play_music then
							@jukebox.music_cycle
						end
						
						sleep 1 
					end
					@jukebox.stop
				ensure
					ActiveRecord::Base.verify_active_connections!()
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