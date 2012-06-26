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
  	redirect_to "/login", :notice => "Check je e-mail en voer je pin code hieronder in"
  end
end
