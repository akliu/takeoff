class AddFareToReservations < ActiveRecord::Migration
  def change
    add_column :reservations, :price, :float
  end
end