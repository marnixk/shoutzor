class AuthenticationController < ApplicationController

  #
  # Login
  #
  def login
    render :layout => "login"
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

        user = User.new
        user.name = params['name']
        user.email = params['email']
        user.pin = User.generate_pincode
        user.save
        user.send_notification

        redirect_to "/login", :notice => "Check je e-mail en gebruik je pin code om in te loggen"
    else
        redirect_to "/login", :notice => "Er bestaat al een account met deze gegevens"
    end
  end
end
