class AuthenticationController < ApplicationController

  #
  # Login
  #
  def login
  end

  #
  # Logout
  #
  def logout
  	session[:user] = nil
  	redirect_to "/login", :notice => "Je bent nu uitgelogd" 
  end

  #
  # Form handler for authentication
  #
  def authenticate
  	user = User.where(:name => params['name'], :pin => params['pin']).all

  	# valid user?
	if user.length == 1 then
  		session[:user] = user.first
  		redirect_to "/", :notice => "Je bent ingelogd"
  	else
  		session[:user] = nil
  		redirect_to "/login", :alert => "Onjuist wachtwoord"
  	end
  end

  #
  # Form handler for request a pin code
  #
  def request_pin

    if User.free_account?(params['email'], params['name']) then

        user = User.new(params)
        user.pin = User.generate_pincode
        user.save

        gmail = Gmail.new("shoutzor@gmail.com", "shoutzor_reply")
        gmail.deliver do
            to params['email']
            subject "Shoutzor inlogcode"
            text_part do
                body <<-END 
                    Hoi,

                    Gebruik onderstaande pincode om in te loggen met je accountnaam:

                        Naam: #{user.name}
                        Pincode: #{user.pin}

                    Als het niet lukt even Marnix vragen.
                END
            end
        end

        gmail.logout

        redirect_to "/login", :notice => "Check je e-mail en gebruik je pin code om in te loggen"
    else
        redirect_to "/login", :notice => "Er bestaat al een account met deze gegevens"
    end
  end
end
