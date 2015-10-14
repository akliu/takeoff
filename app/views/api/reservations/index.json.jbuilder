json.array!(@reservations) do |reservation|
  json.extract!(reservation, :id, :user_id, :origin_id,
            :destination_id, :jet_id, :departure_time)
end
