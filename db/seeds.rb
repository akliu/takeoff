# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# Airports
airports = []

sfo = Airport.create(lat: 37.62113171, lng: -122.3811494,
                name: "San Francisco International Airport", code: "SFO")
airports.push(sfo)

oak = Airport.create(lat: 37.7125731, lng: -122.2219368,
                name: "Oakland International Airport", code: "OAK")
airports.push(oak)

sjc = Airport.create(lat: 37.3640847, lng: -121.9302246,
                name: "San Jose International Airport", code: "SJC")
airports.push(sjc)

pdx = Airport.create(lat: 45.5897731, lng: -122.5972882,
                name: "Portland International Airport", code: "PDX")
airports.push(pdx)

hio = Airport.create(lat: 45.5330731, lng: -122.9497265,
                name: "Hillsboro Airport", code: "HIO")
airports.push(hio)

sql = Airport.create(lat: 37.5136572, lng: -122.2527375,
                name: "San Carlos Airport", code: "SQL")
airports.push(sql)

haf = Airport.create(lat: 37.5178765, lng: -122.508413,
                name: "Half Moon Bay Airport", code: "HAF")
airports.push(haf)

hwd = Airport.create(lat: 37.6589251, lng: -122.1241307,
                name: "Hayward Executive Airport", code: "HWD")
airports.push(hwd)

srf = Airport.create(lat: 38.0160697, lng: -122.5259795,
                name: "San Rafael Airport", code: "SRF")
airports.push(srf)

sea = Airport.create(lat: 47.4502535, lng: -122.3110052,
                name: "Seattle-Tacoma International Airport", code: "SEA")
airports.push(sea)

bfi = Airport.create(lat: 47.5366776, lng: -122.3061777,
                name: "King County International Airport", code: "BFI")
airports.push(bfi)

lax = Airport.create(lat: 33.9416378, lng: -118.4086695,
                name: "Los Angeles International Airport", code: "LAX")
airports.push(lax)

ont = Airport.create(lat: 34.0559825, lng: -117.6002457,
                name: "LA/Ontario International Airport", code: "ONT")

sna = Airport.create(lat: 33.6761945, lng: -117.8696646,
                name: "John Wayne Airport", code: "SNA")
airports.push(sna)

san = Airport.create(lat: 32.7338051, lng: -117.1954925,
                name: "San Diego International Airport", code: "SAN")
airports.push(san)

mgm = Airport.create(lat: 32.8146585, lng: -117.1406398,
                name: "Montgomery Field Airport", code: "MGM")
airports.push(mgm)

yvr = Airport.create(lat: 49.1966948, lng: -123.183701,
                name: "Vancouver International Airport", code: "YVR")
airports.push(yvr)

jfk = Airport.create(lat: 40.6413151, lng: -73.7803278,
                name: "John F. Kennedy International Airport", code: "JFK")
airports.push(jfk)

ewr = Airport.create(lat: 40.6895354, lng: -74.1766511,
                name: "Newark Liberty International Airport", code: "EWR")
airports.push(ewr)

lga = Airport.create(lat: 40.7769311, lng: -73.8761546,
                name: "LaGuardia Airport", code: "LGA")
airports.push(lga)

teb = Airport.create(lat: 40.8490265, lng: -74.0651422,
                name: "Teterboro Airport", code: "TEB")
airports.push(teb)

dca = Airport.create(lat: 38.8513687, lng: -77.0422188,
                name: "Ronald Reagan Washington National Airport", code: "DCA")
airports.push(dca)

iad = Airport.create(lat: 38.9531204, lng: -77.4587275,
                name: "Dulles International Airport", code: "IAD")
airports.push(iad)


users = []
andrew = User.create(username: "andrew", password: "andrew")
guest = User.create(username: "Guest", password: "GuestUser")

25.times do
  users.push(User.create(username: Faker::Name.first_name, password: "seeduser"))
end


jet_names = ["Gulfstream 650", "Gulfstream 550", "Gulfstream 450"]
jets = []
125.times do
  jets.push(Jet.create(owner_id: users.sample.id, airport_id: airports.sample.id,
              model: jet_names.sample, capacity: 12))
end


Reservation.create(user_id: guest.id, origin_id: sfo.id,
              destination_id: pdx.id, jet_id: jets.sample.id,
              departure_time: 1.week.ago,
              price: 10862.54)

Reservation.create(user_id: guest.id, origin_id: sjc.id,
              destination_id: lax.id, jet_id: jets.sample.id,
              departure_time: 3.weeks.ago,
              price: 6959.62)

Reservation.create(user_id: guest.id, origin_id: sjc.id,
              destination_id: jfk.id, jet_id: jets.sample.id,
              departure_time: 16.days.ago,
              price: 43354.03)



# andrew = User.create(username: "andrew", password: "andrew")
# kush = User.create(username: "kush", password: "andrew")
# ned = User.create(username: "ned", password: "andrew")
#
#
# Jet.create(owner_id: andrew.id, airport_id: sfo.id, model: "Gulfstream 650",
#             capacity: 12)
#
# Jet.create(owner_id: andrew.id, airport_id: sjc.id, model: "Gulfstream 550",
#             capacity: 12)
#
# Jet.create(owner_id: andrew.id, airport_id: oak.id, model: "Gulfstream 450",
#             capacity: 12)
#
# Jet.create(owner_id: ned.id, airport_id: sfo.id, model: "Gulfstream 650",
#             capacity: 12)
#
# Jet.create(owner_id: ned.id, airport_id: pdx.id, model: "Gulfstream 550",
#             capacity: 12)
#
# Jet.create(owner_id: ned.id, airport_id: oak.id, model: "Gulfstream 450",
#             capacity: 12)
#
# Jet.create(owner_id: kush.id, airport_id: hio.id, model: "Gulfstream 650",
#             capacity: 12)
#
# Jet.create(owner_id: kush.id, airport_id: pdx.id, model: "Gulfstream 550",
#             capacity: 12)
#
# Jet.create(owner_id: kush.id, airport_id: sjc.id, model: "Gulfstream 450",
#             capacity: 12)
