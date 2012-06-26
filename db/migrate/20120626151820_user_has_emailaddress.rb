class UserHasEmailaddress < ActiveRecord::Migration
  def up

  		change_table :users do |t|
  			t.string :email
  		end
  end

  def down
  end
end
