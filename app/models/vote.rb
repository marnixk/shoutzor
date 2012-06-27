class Vote < ActiveRecord::Base
  
	attr_accessible :song, :user, :played, :handled

	belongs_to :user
	belongs_to :song

	# get last vote
	scope :last_vote, proc { order(:created_at).limit(1) }

	# get the next 'x' votes
	scope :next_votes, proc { |x| fresh.order("created_at ASC").limit(x) }

	# get "next up"
	scope :next_vote, proc { next_votes(1) }

	# get unprocessed votes
	scope :fresh, lambda { where(:handled => false ) }
end
