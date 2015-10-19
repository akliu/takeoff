# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# Airports

sfo = Airport.create(lat: 37.62113171, lng: -122.3811494,
                name: "San Francisco International Airport", code: "SFO")

oak = Airport.create(lat: 37.7125731, lng: -122.2219368,
                name: "Oakland International Airport", code: "OAK")

sjc= Airport.create(lat: 37.3640847, lng: -121.9302246,
                name: "San Jose International Airport", code: "SJC")

pdx = Airport.create(lat: 45.5897731, lng: -122.5972882,
                name: "Portland International Airport", code: "PDX")

hio = Airport.create(lat: 45.5330731, lng: -122.9497265,
                name: "Hillsboro Airport", code: "HIO")

andrew = User.create(username: "andrew", password: "andrew")
kush = User.create(username: "kush", password: "andrew")
ned = User.create(username: "ned", password: "andrew")


Jet.create(owner_id: andrew.id, airport_id: sfo.id, model: "Gulfstream 650",
            capacity: 12)

Jet.create(owner_id: andrew.id, airport_id: sjc.id, model: "Gulfstream 550",
            capacity: 12)

Jet.create(owner_id: andrew.id, airport_id: oak.id, model: "Gulfstream 450",
            capacity: 12)

Jet.create(owner_id: ned.id, airport_id: sfo.id, model: "Gulfstream 650",
            capacity: 12)

Jet.create(owner_id: ned.id, airport_id: pdx.id, model: "Gulfstream 550",
            capacity: 12)

Jet.create(owner_id: ned.id, airport_id: oak.id, model: "Gulfstream 450",
            capacity: 12)

Jet.create(owner_id: kush.id, airport_id: hio.id, model: "Gulfstream 650",
            capacity: 12)

Jet.create(owner_id: kush.id, airport_id: pdx.id, model: "Gulfstream 550",
            capacity: 12)

Jet.create(owner_id: kush.id, airport_id: sjc.id, model: "Gulfstream 450",
            capacity: 12)
