class LastPlayedIsDatetime < ActiveRecord::Migration
  def up
  	change_table :songs do |t|
  		t.change :last_played, :datetime
  	end
  end

  def down
  end
end
