class AddAdminFlag < ActiveRecord::Migration
  def up
  	change_table :users do |t|
  		t.boolean :is_admin
  	end
  end

  def down
  end
end
