module Player

	#
	# Control the playing of music
	#
	class MusicControl

		attr_accessor :song

		#
		# Initialize data-members
		#
		def init
			@current_song = nil
			@player_pid = nil
		end

		# 
		# Play a song
		#
		def play(song)
			self.song = song
			@player_pid = spawn("/usr/bin/mplayer", "#{song.file}", :out => "/dev/null")
		end


		#
		# Stop the song
		#
		def stop
			if not @player_pid.nil? then 
				puts "Stopping mplayer: #{@player_pid}"
				Process.kill 9, @player_pid
			end
		end

		#
		# Is the song playing?
		#
		def playing?
			if not @player_pid.nil? then 
				return Process.kill 0, @player_pid
			end
			false
		end


	end

end