class Reservation < ActiveRecord::Base
  validates :user_id, :origin_id, :destination_id, presence: true
  validates :jet_id, :departure_time, presence: true

  belongs_to :user

  belongs_to(
    :origin,
    class_name: "Airport",
    primary_key: :id,
    foreign_key: :origin_id
  )

  belongs_to(
    :destination,
    class_name: "Airport",
    primary_key: :id,
    foreign_key: :destination_id
  )

  belongs_to :jet
end
