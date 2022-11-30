class Debt < ApplicationRecord
  belongs_to :sender, class_name: 'Member', foreign_key: 'sender_id'
  belongs_to :receiver, class_name: 'Member', foreign_key: 'receiver_id'
end
