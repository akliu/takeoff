json.array!(@airports) do |airport|
  json.extract!(airport, :id, :lat, :lng, :name, :code)
end
