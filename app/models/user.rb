class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
  :recoverable, :rememberable, :trackable, :validatable,
  :omniauthable
  include DeviseTokenAuth::Concerns::User

  def as_json(options)
    super(except: [:created_at, :updated_at])
  end
end
