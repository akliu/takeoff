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
        originId: reservation.origin_id,
        destination: reservation.destination_name,
        date: "",
        hour: 0,
        minute: "",
        ampm: "",
        jetId: reservation.jet_id,
        // availableJets: JetStore.all(),
        availableJets: JetStore.atAirportById(reservation.origin_id),
        airportNames: AirportStore.allNames(),
        price: reservation.price
      };
    },

    componentDidMount: function(){
      JetStore.addChangeListener(this._updateJets);
      // ApiUtil.fetchJets({origin: this.state.origin});
      ApiUtil.fetchJets();
    },

    _updateJets: function(){
      // this.setState({availableJets: JetStore.all()});
      this.setState({availableJets: JetStore.atAirportById(this.state.originId)});
    },

    handleSubmit: function(event){
      event.preventDefault();
      var timezoneAndId = {id: this.props.location.query.id,
                            timezone: -(new Date().getTimezoneOffset() / 60)};
      var params = $.extend({}, this.state, timezoneAndId);
      ApiUtil.editReservation(params);
      this.props.history.pushState(null, "reservations/index");
    },

    // handleOriginChange: function(event){
    //   event.preventDefault();
    //   var airport = AirportStore.findByName(event.currentTarget.value);
    //   this.setState({origin: event.currentTarget.value,
    //                   originId: airport.id,
    //                   jetId: -1});
    //
    //   // ApiUtil.fetchJets({origin: event.currentTarget.value});
    //   ApiUtil.fetchJets();
    // },

    handleOriginChange: function(value){
      var airport = AirportStore.findByName(value);
      this.setState({origin: value,
                      originId: airport.id,
                      jetId: -1});
      // ApiUtil.fetchJets({origin: event.currentTarget.value});
      ApiUtil.fetchJets();
      this.updatePrice(value, this.state.destination);
    },

    handleDestinationChange: function(value){
      this.setState({destination: value});
      this.updatePrice(this.state.origin, value);
    },

    updatePrice: function(newPrice){
      this.setState({price: newPrice});
    },

    render: function(){

      return (
        <div className="reservation-list modal-content">
          <h2>Change Reservation</h2>
          <form onSubmit={this.handleSubmit}>
            <label>From: </label>
            <AirportSelector airports={this.state.airportNames}
                          default={this.state.origin}
                          update={this.handleOriginChange}/>



            <label>To: </label>
            <AirportSelector airports={this.state.airportNames}
                          default={this.state.destination}
                          update={this.handleDestinationChange}/>




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
              <label>Aircraft: </label>
              <select valueLink={this.linkState("jetId")} id="jet">
                <option></option>
                {
                  this.state.availableJets.map(function(jet){
                    var ownerName;
                    {
                    ownerName = jet.owner_name.charAt(0).toUpperCase() +
                                jet.owner_name.slice(1);
                    }
                    return (
                      <option value={jet.id} key={jet.id}>
                        {ownerName + "'s " + jet.model}
                      </option>
                    );
                  })
                }
              </select>
              <br/>
              <input type="submit" value="Update Reservation"/>
          </form>
          <Price origin={this.state.origin}
                  destination={this.state.destination}
                  updateForm={this.updatePrice}
                  price={this.state.price} />
          <JetImages jet={JetStore.findById(parseInt(this.state.jetId)).model} />
        </div>
      );
    }

  });

}(this));




// <select onChange={this.handleOriginChange} value={this.state.origin}
//         id="origin">
//   <option></option>
//   {
//     AirportStore.all().map(function(airport){
//       return (
//         <option value={airport.name} key={airport.id}>
//           {airport.name} - {airport.code}
//         </option>
//       );
//     }.bind(this))
//   }
// </select>




// <select valueLink={this.linkState("destination")} id="destination">
//   <option></option>
//   {
//     AirportStore.all().map(function(airport){
//       return (
//         <option value={airport.name} key={airport.id} >
//           {airport.name} - {airport.code}
//         </option>
//       );
//     })
//   }
// </select>
