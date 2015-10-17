ApiActions = {
  receiveAirports: function(airports) {
    AppDispatcher.dispatch({
      actionType: AirportConstants.AIRPORTS_RECEIVED,
      payload: airports
    });
  },

  receiveAllAirports: function(airports) {
    AppDispatcher.dispatch({
      actionType: AirportConstants.ALL_AIRPORTS_RECEIVED,
      payload: airports
    });
  },

  receiveFutureReservations: function(reservations) {
    AppDispatcher.dispatch({
      actionType: ReservationConstants.FUTURE_RESERVATIONS_RECEIVED,
      payload: reservations
    });
  }
};
