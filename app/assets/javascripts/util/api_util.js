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

  fetchAirports: function(airports){
    $.ajax({
      url: "api/airports",
      method: "GET",
      success: function(airports){
        debugger
        ApiActions.receiveAirports(airports);
      }
    });
  }
};
