class CreateDebts < ActiveRecord::Migration[6.1]
  def change
    create_table :debts do |t|
      t.float :amount
      t.references :sender
      t.references :receiver

      t.timestamps
    end
  end
end
