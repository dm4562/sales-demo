class Destination < ApplicationRecord
  belongs_to :user

  def as_json(options)
    super(except: [:created_at, :updated_at]).merge({created_by: self.user_details})
  end

  def user_details
    {
      name: self.user.name,
      email: self.user.email
    }
  end
end
