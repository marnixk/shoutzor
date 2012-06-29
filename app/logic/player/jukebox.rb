module Player

	#
	#  This class container the necessary elements to control the player
	#
	class Jukebox

		attr_accessor :volume, :player

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

		def now_playing
			current_song = player.song
			track_length = current_song['length']
			playtime = player.seconds_playing.to_i

			{
				:song => { :album => current_song.album, :artist => current_song.artist, :title => current_song.title}, 
				:raw => {
					:track_length => track_length, 
					:playtime => playtime,
				},
				:formatted => {
					:track_length => Time.at(track_length).strftime("%M:%S"),
					:playtime => Time.at(playtime).strftime("%M:%S")
				}

			}
		end



		#
		#  Retrieve daemon instance
		#
		def self.instance
			$player_daemon.jukebox
		end

	end

end