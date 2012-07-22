module Player

	class VoteAnalysis

		def analyse

			prev = nil
			votes = Vote.includes(:song).all
			votes.each_with_index do |vote, index|
				if prev.nil? then
					prev = vote
					next
				end

				diff = vote.updated_at - prev.updated_at
				if diff < 10 then
					if prev.song.blank? then
						puts "dont know about this song anymore"
					else
						puts "played short @previous (#{prev.updated_at}): #{prev.song.file}"
					end
				end

				prev = vote
			end

			puts "Done"
			
		end

	end

end
