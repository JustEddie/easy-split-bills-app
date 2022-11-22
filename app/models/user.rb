class User < ApplicationRecord
    has_secure_password
    validates :username, presence: true
    validates :email, uniqueness: true
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :username, length: { minimum: 2 }
end
