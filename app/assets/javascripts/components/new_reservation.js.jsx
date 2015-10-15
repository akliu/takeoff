(function(window) {
  'use strict';

  window.NewReservation = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState: function(){
      return {
        origin: "",
        destination: "",
        date: "",
        hour: 0,
        minute: 0,
        ampm: ""
      };
    },

    handleSubmit: function(event){
      event.preventDefault();
      debugger
    },

    render: function(){
      var hours = [1,2,3,4,5,6,7,8,9,10,11,12];
      var minutes = [15,30,45];
      return (
        <div>
          <h3>New Reservation</h3>
          <form onSubmit={this.handleSubmit}>
            <label for="origin">From: </label>
            <select valueLink={this.linkState("origin")} id="origin">
              <option></option>
              {
                AirportStore.all().map(function(airport){
                  var selected = "";
                  if (this.props.location.query.code === airport.code){
                    selected = "selected";
                  }
                  return (
                    <option value={airport.name} selected={selected}>
                      {airport.name} - {airport.code}
                    </option>
                  );
                }.bind(this))
              }
            </select>
            <br/>
            <label for="destination">To: </label>
            <select valueLink={this.linkState("destination")} id="destination">
              <option></option>
              {
                AirportStore.all().map(function(airport){
                  return (
                    <option value={airport.name}>
                      {airport.name} - {airport.code}
                    </option>
                  );
                })
              }
            </select>
            <br/>
            <label for="date">Date: </label>
            <input type="date" valueLink={this.linkState("date")} id="date"></input>
            <br/>
            <label for="hour">Departure Time: </label>
            <label for="minute"></label>
            <label for="ampm"></label>
              <select valueLink={this.linkState("hour")} id="hour">
                <option></option>
                {
                  hours.map(function(hour){
                    return (
                      <option value={hour}>
                        {hour}
                      </option>
                    );
                  })
                }
              </select> :&nbsp;
              <select valueLink={this.linkState("minute")} id="minute">
                <option></option>
                <option value={0}>00</option>
                {
                  minutes.map(function(minute){
                    return (
                      <option value={minute}>
                        {minute}
                      </option>
                    );
                  })
                }
              </select>
              <select valueLink={this.linkState("ampm")} id="ampm">
                <option value="am">am</option>
                <option value="pm">pm</option>
              </select>
              <br/>
              <input type="submit" value="Make Reservation"/>
          </form>
        </div>
      );
    }

  });

}(this));
