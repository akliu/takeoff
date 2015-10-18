(function(window) {
  'use strict';

  var hours = [1,2,3,4,5,6,7,8,9,10,11,12];
  var minutes = [15,30,45];

  window.EditReservation = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState: function(){
      var reservation = ReservationStore.find(parseInt(this.props.location.query.id));
      return {
        origin: reservation.origin_name,
        destination: reservation.destination_name,
        date: "",
        hour: 0,
        minute: "",
        ampm: ""
      };
    },

    handleSubmit: function(event){
      event.preventDefault();
      var timezoneAndId = {id: this.props.location.query.id,
                            timezone: -(new Date().getTimezoneOffset() / 60)};
      var params = $.extend({}, this.state, timezoneAndId);
      ApiUtil.editReservation(params);
      this.props.history.pushState(null, "reservations/index");
    },

    render: function(){

      return (
        <div className="reservation-list modal-content">
          <h2>Change Reservation</h2>
          <form onSubmit={this.handleSubmit}>
            <label>From: </label>
            <select valueLink={this.linkState("origin")} id="origin">
              <option></option>
              {
                AirportStore.all().map(function(airport){
                  return (
                    <option value={airport.name} key={airport.id}>
                      {airport.name} - {airport.code}
                    </option>
                  );
                }.bind(this))
              }
            </select>
            <br/>
            <label>To: </label>
            <select valueLink={this.linkState("destination")} id="destination">
              <option></option>
              {
                AirportStore.all().map(function(airport){
                  return (
                    <option value={airport.name} key={airport.id} >
                      {airport.name} - {airport.code}
                    </option>
                  );
                })
              }
            </select>
            <br/>
            <label>Date: </label>
            <input type="date" valueLink={this.linkState("date")} id="date"></input>
            <br/>
            <label>Departure Time: </label>
              <select valueLink={this.linkState("hour")} id="hour">
                <option></option>
                {
                  hours.map(function(hour){
                    return (
                      <option value={hour} key={hour}>
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
                      <option value={minute} key={minute}>
                        {minute}
                      </option>
                    );
                  })
                }
              </select>&nbsp;
              &nbsp;
              <select valueLink={this.linkState("ampm")} id="ampm">
                <option></option>
                <option value="am">am</option>
                <option value="pm">pm</option>
              </select>
              <br/>
              <input type="submit" value="Update Reservation"/>
          </form>
        </div>
      );
    }

  });

}(this));
