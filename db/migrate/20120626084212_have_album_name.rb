class HaveAlbumName < ActiveRecord::Migration
  def up
  		remove_column :songs, :description
  		change_table :songs do |t|
  			t.string :album
  		end
  end

  def down
  end
end
