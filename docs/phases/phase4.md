# Phase 4: Reservation updating and deletion

## Rails
### Models
* Reservation

### Controllers
* Api::ReservationsController (destroy, index, show, update)

### Views
* reservations/index.json.jbuilder
* reservations/show.json.jbuilder

## Flux
### Views (React Components)
* Reservation index
  -ReservationItem

### Stores
* Reservation

### Actions
* ApiActions.receiveAllReservations
* ApiActions.receiveSingleReservation
* ApiActions.deleteReservation


### ApiUtil
* ApiUtil.fetchAllReservations
* ApiUtil.fetchSingleReservation
* ApiUtil.createReservation
* ApiUtil.editReservation
* ApiUtil.destroyReservation

## Gems/Libraries
* Google maps API
