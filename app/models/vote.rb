class Vote < ActiveRecord::Base
  
	attr_accessible :song, :user

	belongs_to :user
	belongs_to :song

	# get last vote
	scope :last_vote, proc { order(:created_at).limit(1) }

	# get the next 'x' votes
	scope :next_votes, proc { |x| order("create_at ASC").limit(x) }

	# def song
	# 	Song.find(self.song_id)
	# end

end
