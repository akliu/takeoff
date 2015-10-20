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
        price: ""
      };
    },

    componentDidMount: function(){
      JetStore.addChangeListener(this._updateJets);
      // ApiUtil.fetchJets({origin: this.state.origin});
      ApiUtil.fetchJets();
    },

    _updateJets: function(){
      // this.setState({availableJets: JetStore.all()});
      var airportId = parseInt(this.props.location.query.id);
      this.setState({availableJets: JetStore.atAirportById(airportId)});
    },

    handleSubmit: function(event){
      event.preventDefault();
      var timeOffset = {timezone: -(new Date().getTimezoneOffset() / 60)};
      var params = $.extend({}, this.state, timeOffset);
      ApiUtil.createReservation(params);
      this.props.history.pushState(null, "reservations/index");
    },

    handleOriginChange: function(event){
      event.preventDefault();
      this.setState({origin: event.currentTarget.value,
                      jetId: -1});
      // ApiUtil.fetchJets({origin: event.currentTarget.value});
      ApiUtil.fetchJets();
      this.updatePrice(event.currentTarget.value, this.state.destination);
    },

    updatePrice: function(newPrice){
      this.setState({price: newPrice});
    },

    render: function(){
      return (
        <div className="reservation-list modal-content">
          <h2>New Reservation</h2>
          <form onSubmit={this.handleSubmit}>
            <label>From: </label>
            <select onChange={this.handleOriginChange} value={this.state.origin}
                    id="origin">
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
              <input type="submit" value="Make Reservation"/>
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
