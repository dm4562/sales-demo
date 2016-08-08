class RenameDestTypeToContinent < ActiveRecord::Migration[5.0]
  def change
    rename_column :destinations, :dest_type, :continent
  end
end
