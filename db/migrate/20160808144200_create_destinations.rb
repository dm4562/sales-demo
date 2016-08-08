class CreateDestinations < ActiveRecord::Migration[5.0]
  def change
    create_table :destinations do |t|
      t.string :name
      t.string :dest_type
      t.integer :score
      t.string :desc_short
      t.text :desc_long
      t.string :image_src
      t.references :user, foreign_key: true, index: true

      t.timestamps
    end
  end
end
