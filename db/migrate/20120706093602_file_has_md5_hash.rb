class FileHasMd5Hash < ActiveRecord::Migration
  def up
  	change_table :songs do |t|
  		t.string :crc
  	end
  end

  def down
  end
end
