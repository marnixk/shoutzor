class Vote < ActiveRecord::Base
  
  belongs_to :user
  has_one :song

  # get last vote
  scope :last_vote, proc { order(:created_at).limit(1) }

  # get the next 'x' votes
  scope :next_votes, proc { |x| order("create_at ASC").limit(x) }

end
