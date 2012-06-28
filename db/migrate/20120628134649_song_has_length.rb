class SongHasLength < ActiveRecord::Migration
  def up
  	change_table :songs do |t|
  		t.integer :length
  	end
  end

  def down
  end
end
