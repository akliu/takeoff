ApiUtil = {
  logOut: function() {
    $.ajax({
      url: "/session",
      method: "DELETE",
      success: function(){
        window.location="/";
      }
    });
  },

  fetchAirports: function(filterParams){
    $.ajax({
      url: "api/airports",
      method: "GET",
      data: filterParams,
      success: function(airports){
        ApiActions.receiveAirports(airports);
      }
    });
  },

  fetchReservations: function(){
    $.ajax({
      url: "api/reservations",
      method: "GET",
      success: function(reservations){
        ApiActions.receiveReservations(reservations);
      }
    });
  },

  createReservation: function(params){
    $.ajax({
      url: "api/reservations",
      method: "POST",
      data: params,
      success: function(reservations){
        ApiActions.receiveReservations(reservations);
      }
    });
  }
};
