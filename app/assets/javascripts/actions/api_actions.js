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

  receiveReservations: function(reservations) {
    AppDispatcher.dispatch({
      actionType: ReservationConstants.RESERVATIONS_RECEIVED,
      payload: reservations
    });
  }
};
