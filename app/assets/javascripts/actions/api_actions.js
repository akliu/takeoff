ApiActions = {
  receiveAirports: function(airports) {
    AppDispatcher.dispatch({
      actionType: AirportConstants.AIRPORTS_RECEIVED,
      payload: airports
    });
  }
};
