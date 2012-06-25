class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
    	t.string :name
    	t.date   :last_vote
      	t.timestamps
    end
  end
end
