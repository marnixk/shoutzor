class VoteController < ApplicationController

	def coming_up
		render :json => Vote.next_votes(5)
	end


	#
	# Vote for a song
	#
	def vote_for

		result = :incomplete

		if current_user.can_vote? then
			if not @params['id'].blank? and @params['id'].numeric? then
				song = Song.find_by_id(@params['id'].to_i)

				if not song.nil? then 
					vote = Vote.new({ :song => song, :user => current_user })
					result = vote.save ? :done : :error
				end
			end
		else
			result = :too_soon
		end

		render :json => result
	end

end
