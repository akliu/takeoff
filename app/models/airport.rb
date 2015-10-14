class Airport < ActiveRecord::Base
  validates :lat, :lng, :name, :code, presence: true

  def self.in_bounds(bounds)
    @airports = Airport.where("lat < ?", bounds[:northEast][:lat])
        .where("lat > ?", bounds[:southWest][:lat])
        .where("lng > ?", bounds[:southWest][:lng])
        .where("lng < ?", bounds[:northEast][:lng])
  end
end
