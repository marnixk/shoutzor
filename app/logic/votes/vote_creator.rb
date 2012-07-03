module Votes

	class VoteCreator

		def vote(current_user, song_id) 
			result = { :status => :incomplete }

			if current_user.can_vote? then
				if not song_id.blank? then
					song = Song.find_by_id(song_id)

					if not song.nil? then 

						if song.can_vote? then

							vote = Vote.new({ :song => song, :user => current_user })
							result = { :status => (vote.save ? :done : :error) }

							# update last vote for current user
							current_user.last_vote = Time.now
							current_user.save
						else
							result = { :status => :played_recently }
						end
					end
				end
			else
				result = { :status => :too_soon, :wait_for => current_user.wait_for_seconds }
			end

			result
		end

	end
end