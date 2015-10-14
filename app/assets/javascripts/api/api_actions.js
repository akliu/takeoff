ApiActions = {
  receiveAirports: function(airports) {
    debugger
    AppDispatcher.dispatch({
      actionType: AirportConstants.AIRPORTS_RECEIVED,
      payload: airports
    });
  }
};
