(function(window) {
  'use strict';

  window.NewReservation = React.createClass({
    handleSubmit: function(){
      debugger
    },

    render: function(){
      // debugger
      return (
        <div>
          <h3>New Reservation</h3>
          <form onSubmit={this.handleSubmit}>
            <label for="origin">From: </label>
            <select name="reservation[origin]" id="origin">
              <option></option>
              {
                AirportStore.all().map(function(airport){
                    return (
                      <option value={airport.name}>
                        {airport.name} {airport.code}
                      </option>
                    );
                })
              }
            </select>
          </form>
        </div>
      );
    }

  });

}(this));
