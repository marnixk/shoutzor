class SearchController < ApplicationController

	#
	# Try to find some songs using the 'q' parameter
	#
	def find
		items = Array(Song.search_list(params['q']))
		render :json => items
	end


end
