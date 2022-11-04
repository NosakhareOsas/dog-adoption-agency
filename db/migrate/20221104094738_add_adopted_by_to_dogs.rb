class AddAdoptedByToDogs < ActiveRecord::Migration[7.0]
  def change
    add_column :dogs, :adopted_by, :string
  end
end
