(function(window) {
  'use strict';

  var hours = [1,2,3,4,5,6,7,8,9,10,11,12];
  var minutes = [15,30,45];

  window.NewReservation = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState: function(){
      var airportId = parseInt(this.props.location.query.id);
      return {
        origin: this.props.location.query.name,
        destination: "",
        date: "",
        hour: 0,
        minute: "",
        ampm: "",
        jetId: -1,
        availableJets: JetStore.atAirportById(airportId),
        airportNames: AirportStore.allNames(),
        price: ""
      };
    },

    componentDidMount: function(){
      JetStore.addChangeListener(this._updateJets);
      // ApiUtil.fetchJets({origin: this.state.origin});
      AirportStore.addChangeListener(this._updateAirports);
      ApiUtil.fetchJets();
    },

    _updateAirports: function(){
      this.setState({airportNames: AirportStore.allNames()});
    },

    _updateJets: function(){
      // this.setState({availableJets: JetStore.all()});
      // var airportId = parseInt(this.props.location.query.id);
      this.setState({availableJets: JetStore.atAirport(this.state.origin)});
    },

    handleSubmit: function(event){
      event.preventDefault();
      var timeOffset = {timezone: -(new Date().getTimezoneOffset() / 60)};
      var params = $.extend({}, this.state, timeOffset);
      ApiUtil.createReservation(params);
      this.props.history.pushState(null, "reservations/index");
    },

    // handleOriginChange: function(event){
    //   event.preventDefault();
    //   this.setState({origin: event.currentTarget.value,
    //                   jetId: -1});
    //   // ApiUtil.fetchJets({origin: event.currentTarget.value});
    //   ApiUtil.fetchJets();
    //   this.updatePrice(event.currentTarget.value, this.state.destination);
    // },

    handleOriginChange: function(value){
      this.setState({origin: value,
                      jetId: -1});
      // ApiUtil.fetchJets({origin: event.currentTarget.value});
      ApiUtil.fetchJets();
      this.updatePrice(value, this.state.destination);
    },

    handleDestinationChange: function(value){
      this.setState({destination: value});
      this.updatePrice(this.state.origin, value);
    },

    handleDateChange: function(event){
      event.preventDefault();
      this.setState({date: event.currentTarget.value});
      this.forceUpdate();
    },

    updatePrice: function(newPrice){
      this.setState({price: newPrice});
    },

    render: function(){
      return (
        <div className="reservation-list modal-content">
          <ValidateInput inputs={this.state} />
          <h2>New Reservation</h2>
          <form onSubmit={this.handleSubmit}>
            <AirportSelector airports={this.state.airportNames}
                          default={this.state.origin}
                          update={this.handleOriginChange}
                          type="From:"/>
            <AirportSelector airports={this.state.airportNames}
                          update={this.handleDestinationChange}
                          type="To:"/>
            <label>Date: </label>
            <input type="date"
                    className="form-control date-input"
                    onChange={this.handleDateChange}
                    value={this.state.date}
                    id="date"></input>
            <label>Departure Time: </label>
            <br/>
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
              <select className="form-control aircraft-selector" valueLink={this.linkState("jetId")} id="jet">
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
              <button type="submit" className="btn btn-default">Make Reservation</button>
          </form>
          <br/>
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


            // <input type="date" className="form-control date-input" valueLink={this.linkState("date")} id="date"></input>



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
