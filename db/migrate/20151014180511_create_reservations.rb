class CreateReservations < ActiveRecord::Migration
  def change
    create_table :reservations do |t|
      t.integer :user_id, null: false
      t.integer :origin_id, null: false
      t.integer :destination_id, null: false
      t.integer :jet_id, null: false
      t.datetime :departure_time, null: false

      t.timestamps null: false
    end

    add_index :reservations, :user_id
    add_index :reservations, :origin_id
    add_index :reservations, :destination_id
    add_index :reservations, :jet_id
  end
end
