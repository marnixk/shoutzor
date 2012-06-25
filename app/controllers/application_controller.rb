class ApplicationController < ActionController::Base
  protect_from_forgery

  before_filter :is_loggedin, :except => [:login, :authenticate, :logout]

  def login
  end

  def logout
  	session[:user] = nil
  	redirect_to "/login", :notice => "Je bent nu uitgelogd" 
  end

  def authenticate
  	user = User.where(:name => params['name'], :pin => params['pin']).all

  	# valid user?
	if user.length == 1 then
  		session[:user] = user.first
  		redirect_to "/index", :notice => "Je bent ingelogd"
  	else
  		session[:user] = nil
  		redirect_to "/login", :alert => "Onjuist wachtwoord"
  	end
  end

  def request_pin
  	redirect_to "/login", :notice => "Check je e-mail en voer je pin code hieronder in"
  end

  def index
  end


  protected

	  #
	  # Retrieve the current user
	  #
	  def current_user
	  	session[:user]
	  end


	  #
	  # determine if user is logged in
	  #
	  def is_loggedin 
	  	if not current_user.nil? 
	  		return true
	  	else
	  		redirect_to :action => :login, :controller => :application
	  		return false
	  	end
	  end

end
