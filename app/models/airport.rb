class Airport < ActiveRecord::Base
  validates :lat, :lng, :name, :code, presence: true

  has_many(
    :departing_reservations,
    class_name: "Reservation",
    primary_key: :id,
    foreign_key: :origin_id
  )

  has_many(
    :arriving_reservations,
    class_name: "Reservation",
    primary_key: :id,
    foreign_key: :destination_id
  )

  def self.in_bounds(bounds)
    @airports = Airport.where("lat < ?", bounds[:northEast][:lat])
        .where("lat > ?", bounds[:southWest][:lat])
        .where("lng > ?", bounds[:southWest][:lng])
        .where("lng < ?", bounds[:northEast][:lng])
  end
end
