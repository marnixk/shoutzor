class TrackNumber < ActiveRecord::Migration
  def up
  	change_table :songs do |t|
  		t.integer :track
  	end
  end

  def down
  end
end
