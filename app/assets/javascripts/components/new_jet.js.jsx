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
        <div className="reservation-list modal-content">
          <h2>Register my Jet</h2>
          <form onSubmit={this.handleSubmit}>
            <label>Jet Model: </label>
            <select onChange={this.handleJetSelection} value={this.state.jet}>
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
              <select valueLink={this.linkState("airport")} >
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
              <input type="submit" value="Register"/>
          </form>
        </div>
      );
    }

  });

}(this));
