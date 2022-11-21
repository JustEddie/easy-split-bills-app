class User < ApplicationRecord
    has_secure_password
    validates :name, presence: true
    validates :email, uniqueness: true
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :name, length: { minimum: 2 }
end
