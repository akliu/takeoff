json.array!(@reservations) do |reservation|
  json.extract!(reservation, :id, :user_id, :origin_name,
            :origin_code, :origin_id, :destination_name, :destination_code, :destination_id,
            :jet, :jet_id, :departure_time, :price, :created_at, :updated_at)
end
