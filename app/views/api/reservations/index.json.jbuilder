json.array!(@reservations) do |reservation|
  json.extract!(reservation, :id, :user_id, :origin_name,
            :origin_code, :destination_name, :destination_code,
            :jet, :departure_time, :created_at, :updated_at)
end
