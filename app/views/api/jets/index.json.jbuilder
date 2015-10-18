json.array!(@jets) do |jet|
  json.extract!(jet, :id, :owner_id, :model, :capacity)
end
