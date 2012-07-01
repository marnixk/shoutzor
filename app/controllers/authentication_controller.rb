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
  	redirect_to "/login", :notice => "You have signed out" 
  end

  #
  # Form handler for authentication
  #
  def authenticate
  	user = User.where(:name => params['name'], :pin => params['pin']).all

  	# valid user?
	  if user.length == 1 then
  		session[:user] = user.first
  		redirect_to "/", :notice => "You're now logged in", :success => true
  	else
  		session[:user] = nil
  		redirect_to "/login", :alert => "Incorrect username or password"
  	end
  end

  #
  # Form handler for request a pin code
  #
  def request_pin

    if params['email'].blank? or params['name'].blank? then
        redirect_to "/login", :alert => "Not all fields have been filled out properly"
        return
    end

    if User.free_account?(params['email'], params['name']) then

        user = User.new
        user.name = params['name']
        user.email = params['email']
        user.pin = User.generate_pincode
        user.save
        user.send_notification

        redirect_to "/login?registered=true", :success => true
    else
        redirect_to "/login", :alert => "An account with this information exists"
    end
  end
end
