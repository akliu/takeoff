class Airport < ActiveRecord::Base
  validates :lat, :lng, :name, :code, presence: true
end
