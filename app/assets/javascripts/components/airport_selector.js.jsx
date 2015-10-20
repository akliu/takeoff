(function(window) {
  'use strict';

  window.AirportSelector = React.createClass({

    getInitialState: function(){
    var initialInput = this.props.default;
    if(typeof initialInput === "undefined"){
      initialInput = "";
    }

      return { inputVal: initialInput};
    },

    handleInput: function(event){
      this.setState({inputVal: event.currentTarget.value});
      this.props.update(event.currentTarget.value);
    },

    matches: function(){
      var matches =[];
      if(this.state.inputVal.length === 0){
        return this.props.airports;
      }

      this.props.airports.forEach(function (airport){
        var sub = airport.slice(0, this.state.inputVal.length);
        if(sub.toLowerCase() === this.state.inputVal.toLowerCase()){
          matches.push(airport);
        }
      }.bind(this));

      if (matches.length === 0) {
        matches.push("No matches");
      }

      return matches;
    },

    selectName: function(event) {
      var name = event.currentTarget.innerText;
      this.setState({inputVal: name});
      this.props.update(name);
    },

    render: function(){
      var matches = this.matches();
      var results = [];
      if(this.state.inputVal.length >= 1){
        results = matches.map(function(result){
          return <li onClick={this.selectName}>{result}</li>;
        }.bind(this));
      }

      if(typeof this.state.inputVal != "undefined"){
        if(matches.length === 1 && matches[0] === this.state.inputVal){
          results = [];
        }
      }

      return (
        <div className="airport-selector">
          <input onChange={this.handleInput} value={this.state.inputVal} />
          <ul>
            {results}
          </ul>
        </div>
      );
    }

  });

}(this));
