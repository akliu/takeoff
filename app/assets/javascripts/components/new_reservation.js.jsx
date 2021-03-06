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
        hour: "",
        minute: "",
        ampm: "",
        jetId: "",
        availableJets: JetStore.atAirportById(airportId),
        airportNames: AirportStore.allNames(),
        price: "",
        errors: [],
        startDate: moment()
      };
    },

    componentDidMount: function(){
      JetStore.addChangeListener(this._updateJets);
      // ApiUtil.fetchJets({origin: this.state.origin});
      AirportStore.addChangeListener(this._updateAirports);
      ApiUtil.fetchJets();
    },

    componentWillUnmount: function(){
      JetStore.removeChangeListener(this._updateJets);
      AirportStore.removeChangeListener(this._updateAirports);
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
      if(this.validate()){
        var timeOffset = {timezone: -(new Date().getTimezoneOffset() / 60)};
        var state = $.extend({}, this.state);
        delete state.startDate;
        var params = $.extend({}, state, timeOffset);
        ApiUtil.createReservation(params);
        this.props.history.pushState(null, "reservations/index");
      }
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

      if(errorsFound.length === 0){
        return true;
      }else{
        this.setState({errors: errorsFound});
        return false;
      }
    },

    handleOriginChange: function(value){
      this.setState({origin: value,
                      jetId: -1,
                      availableJets: JetStore.atAirport(value)});
    },

    handleDestinationChange: function(value){
      this.setState({destination: value});
    },

    handleDateChange: function(newDate){
      // event.preventDefault();
      var date = newDate.format('l');
      this.setState({date: date, startDate: newDate});
    },

    updatePrice: function(newPrice){
      this.setState({price: newPrice});
    },

    // calendarChange: function(date) {
    //   this.setState({
    //     startDate: date
    //   });
    // },

    render: function(){
      return (
        <div className="animated fadeInUp reservation-list modal-content">
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
            <DatePicker selected={this.state.startDate}
                        onChange={this.handleDateChange}
                        dateFormat="MM/DD/YYYY"/>
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
          <br/>
        </div>
      );
    }

  });

}(this));
