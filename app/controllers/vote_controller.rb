class VoteController < ApplicationController

	NumberOfVotesToShow = 8

	#
	#   Get all the upcoming songs and predict when they are being played
	#
	def playlist
		votes = Vote.all_votes.includes([:song, :user])
		predictor = Player::VotePredictor.new
		predictions = predictor.predict(votes)

		model_list = predictions.map do |p| 
			{ 
				:requested_by => p[:model].user.name, 
				:requested_at => p[:model].created_at, 
				:plays_at => p[:time],
				:song => p[:model].song.to_json
			}
		end

		render :json => model_list
	end

	#
	# Return json result for upcoming votes
	#
	def coming_up
		votes = Vote.next_votes(NumberOfVotesToShow)
		json_list = votes.map { |v| v.song.to_json }
		render :json => json_list
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

		render :json => result
	end

end
