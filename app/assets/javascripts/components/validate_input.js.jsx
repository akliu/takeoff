(function(window) {
  'use strict';

  window.ValidateInput = React.createClass({
    getInitialState: function(){
      return({errors: []});
    },

    componentWillReceiveProps: function(newProps){
      this.setState({errors: []});
      var newErrors = [];
      if(newProps.inputs.origin === newProps.inputs.destination  &&
            newProps.inputs.origin !== "" &&
            newProps.inputs.destination !== ""){
        newErrors.push("Destination cannot be the same as origin");
      }
      if(newProps.inputs.date !== ""){
        if(new Date(newProps.inputs.date) < new Date()){
          newErrors.push("Departure date must be in the future");
        }
      }
      this.setState({errors: newErrors});
    },

    render: function(){
      return(
        <div className="bg-danger">
          <ul>
            {
              this.state.errors.map(function(error){
                return(<li>{error}</li>);
              }.bind(this))
            }
          </ul>
        </div>
      );
    }

  });
}(this));
