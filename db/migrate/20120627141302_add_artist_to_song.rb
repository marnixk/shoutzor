class AddArtistToSong < ActiveRecord::Migration
  def change
  	change_table :songs do |t|
  		t.string :artist
  	end
  end
end
