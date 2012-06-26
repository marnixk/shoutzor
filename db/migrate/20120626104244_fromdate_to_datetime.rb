class FromdateToDatetime < ActiveRecord::Migration
  def up
  	remove_column :users, :last_vote
  	change_table :users do |t|
  		t.datetime :last_vote
  	end
  end

  def down
  end
end
