class AddPowerDescriptionImagesrcToHeros < ActiveRecord::Migration[5.0]
  def change
    add_column :heros, :power, :integer
    add_column :heros, :description, :text
    add_column :heros, :image_src, :string
  end
end
