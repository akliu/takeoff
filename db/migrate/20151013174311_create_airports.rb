class CreateAirports < ActiveRecord::Migration
  def change
    create_table :airports do |t|
      t.float :lat, null: false
      t.float :lng, null: false
      t.string :name, null: false
      t.string :code, null: false

      t.timestamps null: false
    end
  end
end
