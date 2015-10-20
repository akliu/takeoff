json.array!(@jets) do |jet|
  json.extract!(jet, :id, :owner_id, :owner_name,
                    :airport_id, :airport_name, :model, :capacity)
end
