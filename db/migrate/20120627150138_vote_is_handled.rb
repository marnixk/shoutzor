class VoteIsHandled < ActiveRecord::Migration
  def up
  	change_table :votes do |t|
  		t.boolean :handled, :default => false
  	end

  end

  def down
  end
end
