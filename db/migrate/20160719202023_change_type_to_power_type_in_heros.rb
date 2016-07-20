class ChangeTypeToPowerTypeInHeros < ActiveRecord::Migration[5.0]
  def change
    rename_column :heros, :type, :power_type
  end
end
