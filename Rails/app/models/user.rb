class User < ApplicationRecord
    has_many :projects
    # has_many :members, through :project


    has_secure_password
    validates :username, presence: true
    validates :email, uniqueness: true
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :username, length: { minimum: 2 }
end
