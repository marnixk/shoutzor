module Player

	#
	# Control the playing of music
	#
	class MusicControl

		MaxTicksPerSong = 4 * 60 # 4 minutes

		attr_accessor :song

		#
		# Initialize data-members
		#
		def initialize
			@current_song = nil
			@player_pid = nil
			@tick = 0
		end

		# 
		# Play a song
		#
		def play(song)
			# reset tick
			@tick = 0

			# set song
			self.song = song

			# start song
			@player_pid = spawn("/usr/bin/mplayer", "#{song.file}", :in => "/dev/null", :out => "/dev/null")
		end

		#
		# Stop the song
		#
		def stop
			if not @player_pid.nil? then 
				puts "Stopping mplayer: #{@player_pid}"
				Process.kill 9, @player_pid
				Process.waitpid @player_pid

				@player_pid = nil
				@tick = 0
			end
		end

		#
		#  Add tick
		#
		def tick
			@tick += 1
		end

		#
		#  Return true if the song is playing too long
		#
		def playing_too_long?
			@tick > MaxTicksPerSong
		end

		#
		# Is the song playing?
		#
		def playing?
			if not @player_pid.nil? then 
				begin
					# cleanup if no longer running
					Process.waitpid @player_pid, Process::WNOHANG

					return Process.kill 0, @player_pid
				rescue
					false
				end
			end
			false
		end


	end

end