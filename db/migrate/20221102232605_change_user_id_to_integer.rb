class ChangeUserIdToInteger < ActiveRecord::Migration[7.0]
  def change
    change_column :dogs, :user_id, :integer
  end
end
