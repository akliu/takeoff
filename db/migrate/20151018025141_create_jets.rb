class CreateJets < ActiveRecord::Migration
  def change
    create_table :jets do |t|
      t.integer :owner_id, null: false
      t.integer :airport_id, null: false
      t.string :model, null: false
      t.integer :capacity, null: false

      t.timestamps null: false
    end

    add_index :jets, :owner_id
    add_index :jets, :airport_id
  end
end
