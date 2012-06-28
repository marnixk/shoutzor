class SearchController < ApplicationController

	#
	# Try to find some songs using the 'q' parameter
	#
	def find
		items = Array(Song.autocomplete_for(params['term']))
		render :json => items
	end


end
