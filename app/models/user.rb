class User < ActiveRecord::Base

  has_many :votes

  attr_accessible :name

  #
  # is this user allowed to vote ?
  #
  def can_vote?
  	return self.last_vote > Time.now - 5.minutes
  end
end