class AddPin < ActiveRecord::Migration
  def up
  	change_table :users do |t|
  		t.integer :pin
  	end
  end

  def down
  end
end
