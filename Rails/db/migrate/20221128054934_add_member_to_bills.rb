class AddMemberToBills < ActiveRecord::Migration[6.1]
  def change
    add_reference :bills, :member, foreign_key: true
  end
end
