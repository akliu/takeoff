# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# Airports

Airport.create(lat: 37.62113171, lng: -122.3811494,
                name: "San Francisco International Airport", code: "SFO")

Airport.create(lat: 37.7125731, lng: -122.2219368,
                name: "Oakland International Airport", code: "OAK")

Airport.create(lat: 37.3640847, lng: -121.9302246,
                name: "San Jose International Airport", code: "SJC")

Airport.create(lat: 45.5897731, lng: -122.5972882,
                name: "Portland International Airport", code: "PDX")

Airport.create(lat: 45.5330731, lng: -122.9497265,
                name: "Hillsboro Airport", code: "HIO")
