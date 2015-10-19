json.array!(@reservations) do |reservation|
  json.extract!(reservation, :id, :user_id, :origin_name,
            :origin_code, :destination_name, :destination_code,
            :jet, :jet_id, :departure_time, :price, :created_at, :updated_at)
end
