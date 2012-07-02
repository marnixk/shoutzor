module Player

	class VotePredictor 


		def predict(votes)

			jukebox = Player::Jukebox.instance

			# determine starting time of next song
			seconds_left = 0
			if jukebox.player.play_music then
				current_song = jukebox.player.song
				seconds_left = current_song.tracklength - jukebox.player.seconds_playing
			end	

			# find next start time
			next_starts_at = Time.now + seconds_left.seconds
			since = 0.seconds

			predicted = []
			votes.each do |vote|
				predicted << {
					:model => vote,
					:time => next_starts_at + since
				}

				since += vote.song.length.seconds
			end

			predicted
		end


	end

end