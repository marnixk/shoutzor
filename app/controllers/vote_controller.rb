class VoteController < ApplicationController

	def coming_up
		render :json => Vote.next_votes(5)
	end


	#
	# Vote for a song
	#
	def vote_for

		result = { :status => :incomplete }

		if current_user.can_vote? then
			if not params['id'].blank? then
				song = Song.find_by_id(params['id'].to_i)

				if not song.nil? then 
					vote = Vote.new({ :song => song, :user => current_user })
					result = { :status => (vote.save ? :done : :error) }

					# update last vote for current user
					current_user.last_vote = Time.now
					current_user.save
				end
			end
		else
			result = { :status => :too_soon, :wait_for => current_user.wait_for_seconds }
		end

		render :json => result
	end

end
