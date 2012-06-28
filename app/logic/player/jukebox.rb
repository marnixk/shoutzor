module Player

	#
	#  This class container the necessary elements to control the player
	#
	class Jukebox

		#
		#  Initialize data-members
		#
		def initialize(volume = nil, player = nil)
			@volume = volume
			@player = player
		end	

		#
		#  Make the jukebox stop
		#
		def stop
			@player.stop
		end

		#
		#  This method is run by the thread, every second
		#
		def music_cycle

			@player.tick

			# should stop if too long.
			if @player.playing_too_long? then 
				@player.stop
			end

			if not @player.playing? then

				song = Song.next_song
				Rails.logger.info "Starting to play: #{song.file}"

				# play song, 
				@player.play song

			end

		end


	end

end