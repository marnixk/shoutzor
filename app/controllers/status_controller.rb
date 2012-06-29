class StatusController < ApplicationController

	#
	# Determine the now-playing information
	#
	def now_playing
		jukebox = Player::Jukebox::instance
		render :json => jukebox.now_playing
	end
end
