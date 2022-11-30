class Member < ApplicationRecord
  belongs_to :project
  #   belongs_to :user, through: :project, optional: true
  has_many :bills
  has_many :sender_debts, class_name: 'Debt', foreign_key: 'sender_id'
  has_many :receiver_debts, class_name: 'Debt', foreign_key: 'receiver_id'
end
