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
        date: moment(reservation.departure_time).format('YYYY-MM-DD'),
        hour: moment(reservation.departure_time).format('h'),
        minute: moment(reservation.departure_time).format('m'),
        ampm: moment(reservation.departure_time).format('a'),
        jetId: reservation.jet_id,
        availableJets: JetStore.atAirportById(reservation.origin_id),
        airportNames: AirportStore.allNames(),
        price: reservation.price,
        errors: []
      };
    },

    componentDidMount: function(){
      JetStore.addChangeListener(this._updateJets);
      // ApiUtil.fetchJets({origin: this.state.origin});
      ApiUtil.fetchJets();
    },

    componentWillUnmount: function(){
      JetStore.removeChangeListener(this._updateJets);
    },

    _updateJets: function(){
      // this.setState({availableJets: JetStore.all()});
      this.setState({availableJets: JetStore.atAirportById(this.state.originId)});
    },

    handleSubmit: function(event){
      event.preventDefault();
      if(this.validate()){
        var timezoneAndId = {id: this.props.location.query.id,
                              timezone: -(new Date().getTimezoneOffset() / 60)};
        var params = $.extend({}, this.state, timezoneAndId);
        ApiUtil.editReservation(params);
        this.props.history.pushState(null, "reservations/index");
      }
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
      // this.setState({origin: value,
      //                 originId: airport.id,
      //                 jetId: -1});
      this.setState({origin: value,
                      originId: airport.id,
                      jetId: "",
                      availableJets: JetStore.atAirport(value)});
      // ApiUtil.fetchJets({origin: event.currentTarget.value});
      // ApiUtil.fetchJets();

      // this.updatePrice(value, this.state.destination);
    },

    handleDestinationChange: function(value){
      this.setState({destination: value});
      // this.updatePrice(this.state.origin, value);
    },

    handleDateChange: function(event){
      event.preventDefault();
      this.setState({date: event.currentTarget.value});
    },

    updatePrice: function(newPrice){
      this.setState({price: newPrice});
    },

    validate: function(){
      var errorsFound = [];
      var originFound = false;
      var destinationFound = false;

      var year = moment(this.state.date).format('YYYY');
      var month = Number(moment(this.state.date).format('M')) - 1;
      var day = moment(this.state.date).format('D');
      var hour = Number(this.state.hour);
      var minute = this.state.minute;
      if(typeof hour !== 'undefined'){
        if(this.state.ampm === 'pm'){
          hour = hour + 12;
        }
      }
      var reservationTime = new Date(year, month, day, hour, minute);

      if(this.state.origin === this.state.destination &&
            this.state.origin !== "" &&
            this.state.destination !== ""){
        errorsFound.push("Destination cannot be the same as origin");
      }
      if(reservationTime < new Date()){
        errorsFound.push("Departure date must be in the future");
      }
      if(this.state.origin === ""){
        errorsFound.push("Origin missing");
      }
      if(this.state.destination === ""){
        errorsFound.push("Destination missing");
      }
      if(this.state.date === ""){
        errorsFound.push("Date missing");
      }
      if(this.state.hour === "" || this.state.minute === "" ||
          this.state.ampm === ""){
        errorsFound.push("Departure time missing");
      }
      if(this.state.jetId === ""){
        errorsFound.push("Aircraft missing");
      }

      for(var i = 0; i < this.state.airportNames.length; i++){
        if(this.state.airportNames[i] === this.state.origin){
          originFound = true;
        }
        if(this.state.airportNames[i] === this.state.destination){
          destinationFound = true;
        }
      }
      if(!originFound){
        errorsFound.push("Unknown origin airport");
      }
      if(!destinationFound){
        errorsFound.push("Unknown destination airport");
      }
      console.log(errorsFound);
      if(errorsFound.length === 0){
        return true;
      }else{
        this.setState({errors: errorsFound});
        return false;
      }
    },

    render: function(){

      return (
        <div className="reservation-list modal-content">
          <ValidateInput inputs={this.state} />
          <h2>Change Reservation</h2>
          <form onSubmit={this.handleSubmit}>
            <AirportSelector airports={this.state.airportNames}
                          default={this.state.origin}
                          update={this.handleOriginChange}
                          type="From:"/>


            <AirportSelector airports={this.state.airportNames}
                          default={this.state.destination}
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
              <button type="submit" className="btn btn-default">Update Reservation</button>
          </form>
          <Price origin={this.state.origin}
                  destination={this.state.destination}
                  updateForm={this.updatePrice}
                  price={this.state.price} />
          <JetImages jet={JetStore.findById(parseInt(this.state.jetId)).model} />
          <br/>
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
