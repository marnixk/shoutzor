require 'gmail'

class User < ActiveRecord::Base

	has_many :votes

	attr_accessible :name, :pin, :email

	def self.generate_pincode
		1000 + (rand * 8999).to_i
	end

	#
	#  Determine if this is a free account
	#
	def self.free_account?(name, email)
		User.where("name = ? or email = ?", name, email).all.length == 0
	end


	def send_notification
		record = self

        gmail = Gmail.new("shoutzor@gmail.com", "shoutzor_reply")
        gmail.deliver do
            to record.email
            subject "Shoutzor inlogcode"
            text_part do
                body <<-END.strip_heredoc
                    Hoi,

                    Gebruik onderstaande pincode om in te loggen met je accountnaam:

	                Naam: #{record.name}
	                Pincode: #{record.pin}

                    Als het niet lukt even een begeleider vragen!
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
		elsif self.last_vote < (Time.now - 5.minutes) then
			true
		else
			false
		end

	end

	#
	# Determine how many more seconds the user should wait
	#
	def wait_for_seconds
		vote_from = self.last_vote + 5.minutes
		seconds = (vote_from - Time.now).to_i

		if seconds > 0
			seconds
		else
			0
		end
	end  
end