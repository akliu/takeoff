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
      data: {filterParams},
      success: function(airports){
        ApiActions.receiveAirports(airports);
      }
    });
  }
};
