require 'gmail'

class User < ActiveRecord::Base

	VoteTimeout = 6.minutes

	has_many :votes

	attr_accessible :name, :pin, :email

	def self.create_account!(name)
		exists = User.where("name = ?", name).count
		if exists == 0 then
			user = User.new
	        user.name = name
	        user.email = "local_account@shoutzor"
	        user.pin = User.generate_pincode
	        user.save

	        puts "Account with name `#{name}` and pin `#{user.pin}` created"
	    else
	    	puts "Account exists."
	    end

	end



	def self.generate_pincode
		1000 + (rand * 8999).to_i
	end

	#
	#  Determine if this is a free account
	#
	def self.free_account?(email, name)
		User.where("name = ? or email = ?", name, email).count == 0
	end


	def send_notification
		record = self

        gmail = Gmail.new("yourgmailaccount@gmail.com", "password")
        gmail.deliver do
            to record.email
            subject "Shoutzor inlogcode"
            text_part do
                body <<-END.strip_heredoc
                    Hi!

                    User the pincode below to login to your account:

	                Name: #{record.name}
	                Pincode: #{record.pin}

                    If you can't get it to work make sure to ask someone that knows!
                END
            end
        end

        gmail.logout
	end


	#
	# is this user allowed to vote ?
	#
	def can_vote?
		if self.last_vote.nil? then
			true
		elsif self.last_vote < (Time.now - VoteTimeout) then
			true
		else
			false
		end

	end

	#
	# Determine how many more seconds the user should wait
	#
	def wait_for_seconds
		vote_from = self.last_vote + VoteTimeout
		seconds = (vote_from - Time.now).to_i

		if seconds > 0
			seconds
		else
			0
		end
	end  
end