class Project < ApplicationRecord
    belongs_to :user
    has_many :members
    has_many :bills, through: :members
end
