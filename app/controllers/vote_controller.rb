class VoteController < ApplicationController

	NumberOfVotesToShow = 8

	#
	#   Get all the upcoming songs and predict when they are being played
	#
	def playlist
		votes = Vote.all_votes.includes([:song, :user])
		predictor = Player::VotePredictor.new
		predictions = predictor.predict(votes)

		@model_list = predictions.map do |p| 
			{ 
				:requested_by => p[:model].user.name, 
				:requested_at => p[:model].created_at, 
				:plays_at => p[:time],
				:song => p[:model].song.to_json
			}
		end

		respond_to do |f|
			f.json { render :json => @model_list }
			f.html { render :layout => nil }
		end
	end


	def history
		@history = Song.history.map do |p| 
			{ 
				:played_at => p.last_played,
				:song => p.to_json
			}
		end

		@first = @history.first
		@history = @history[1..-1]

		respond_to do |f|
			f.json { render :json => {:now_playing => @first, :history => @history } } 
			f.html { render :layout => nil }
		end
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
		vote_creator = Votes::VoteCreator.new
		result = vote_creator.vote current_user, params['id'] 
		render :json => result
	end

end
