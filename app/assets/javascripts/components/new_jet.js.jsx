(function(window) {
  'use strict';

  var jets = ["Gulfstream 650", "Gulfstream 550", "Gulfstream 450"];

  window.NewJet = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState: function(){
      return {
        jet: "",
        airport: ""
      };
    },

    handleJetSelection: function(event){
      event.preventDefault();
      this.setState({jet: event.currentTarget.value});
    },

    handleSubmit: function(event){
      event.preventDefault();
      ApiUtil.addJet(this.state);
      this.props.history.pushState(null, "/");
    },

    render: function(){
      return (
        <div className="animated fadeInUp reservation-list modal-content">
          <h2>Register my Jet</h2>
          <form onSubmit={this.handleSubmit}>
            <label>Jet Model: </label>
            <select className="form-control aircraft-selector" onChange={this.handleJetSelection} value={this.state.jet}>
              <option></option>
              {
                jets.map(function(jet){
                  return (
                    <option value={jet} key={jets.indexOf(jet)}>
                      {jet}
                    </option>
                  );
                }.bind(this))
              }
            </select>
            <br/>
            <label>Home Airport: </label>
              <select className="form-control aircraft-selector" valueLink={this.linkState("airport")} >
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
              <button type="submit" className="btn btn-default">Register</button>
          </form>
          <br/>
          <JetImages jet={this.state.jet} />
        </div>
      );
    }

  });

}(this));
