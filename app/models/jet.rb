class Jet < ActiveRecord::Base
  validates :owner_id, :airport_id, :model, :capacity, presence: true

  belongs_to(
    :owner,
    class_name: "User",
    primary_key: :id,
    foreign_key: :owner_id
  )

  belongs_to :airport

  has_many :reservations

end
