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

  fetchAllAirports: function(filterParams){
    $.ajax({
      url: "api/airports",
      method: "GET",
      success: function(airports){
        ApiActions.receiveAllAirports(airports);
      }
    });
  },

  fetchFutureReservations: function(){
    $.ajax({
      url: "api/reservations",
      method: "GET",
      data: {time: "future"},
      success: function(reservations){
        ApiActions.receiveFutureReservations(reservations);
      }
    });
  },

  fetchPastReservations: function(){
    $.ajax({
      url: "api/reservations",
      method: "GET",
      data: {time: "past"},
      success: function(reservations){
        ApiActions.receivePastReservations(reservations);
      }
    });
  },

  createReservation: function(params){
    $.ajax({
      url: "api/reservations",
      method: "POST",
      data: params,
      success: function(reservations){
        ApiActions.receiveFutureReservations(reservations);
      }
    });
  },

  deleteReservation: function(reservation_id){
    $.ajax({
      url: "api/reservations/" + reservation_id,
      method: "DELETE",
      success: function(reservations){
        ApiActions.receiveFutureReservations(reservations);
      }
    });
  },

  editReservation: function(params){
    $.ajax({
      url: "api/reservations/" + params.id,
      method: "PATCH",
      data: params,
      success: function(reservations){
        ApiActions.receiveFutureReservations(reservations);
      }
    });
  },

  fetchJets: function(filterParams){
    $.ajax({
      url: "api/jets",
      method: "GET",
      data: filterParams,
      success: function(jets){
        ApiActions.receiveJets(jets);
      }
    });
  }

};
