class CreateSongs < ActiveRecord::Migration
  def change
    create_table :songs do |t|
    	t.string :title
    	t.string :description
    	t.string :file
    	t.date   :last_played
      	t.timestamps
    end
  end
end
