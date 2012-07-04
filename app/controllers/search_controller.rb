class SearchController < ApplicationController

	#
	# Try to find some songs using the 'q' parameter
	#
	def find
		items = Array(Song.autocomplete_for(params['term']))
		render :json => items
	end

	def list

		results = 	if %w(title artist album).include?(params['by']) then
						title = "Results for #{params['by']} search '#{params['query']}' "
						Song.search_by(params['query'], params['by'])
					elsif params['query'].blank? then
						title = "Most recently added songs ..."
						Song.added_last(100)
					else
						title = "Results for '#{params['query']}'"
						Song.search_all(params['query'])
					end

		small = results.map { |song| song.to_json }

		if small.empty? then 
			small = [{ :title => "There are no results for your query" }]
		end

		render :json => {:title => title, :songs => small }
	end


end
