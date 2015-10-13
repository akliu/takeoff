# Phase 2: Airport Index and Map

## Rails
### Models
* Airport

### Controllers
* Api::AirportsController (show, index)

### Views
* airports/show.json.jbuilder

## Flux
### Views (React Components)
* Map
* NavBar
  - NavBarItem


### Stores
* Airport

### Actions
* ApiActions.receiveAllAirports
* ApiActions.receiveSingleAirport

### ApiUtil
* ApiUtil.fetchAllAirports

## Gems/Libraries
* Flux Dispatcher
