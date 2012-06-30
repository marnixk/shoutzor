class ApplicationController < ActionController::Base

  	protect_from_forgery

  	# check logged in, except for a few authentication related request
  	before_filter :is_loggedin, :except => [:login, :authenticate, :logout, :request_pin]


  	#
  	# Index request
  	#
	def index
		@last_added = SongDecorator.decorate(Song.added_last(100))
		@playstatus = Player::Jukebox.instance.now_playing
 	end


 	def html
 		render :layout => "htmlbase"
 	end

 	def loginhtml
 		render :layout => "login"
 	end

 	def test
 		render :layout => "htmlbase2"
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
		  		redirect_to :action => :login, :controller => :authentication
		  		return false
		  	end
		end

end
