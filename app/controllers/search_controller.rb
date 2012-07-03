class SearchController < ApplicationController

	#
	# Try to find some songs using the 'q' parameter
	#
	def find
		items = Array(Song.autocomplete_for(params['term']))
		render :json => items
	end

	def list

		puts params.inspect

		results = 	if %w(title artist album).include?(params['by']) then
						Song.search_by(params['query'], params['by'])
					else
						Song.search_all(params['query'])
					end

		small = results.map { |song| song.to_json }

		render :json => small
	end


end
