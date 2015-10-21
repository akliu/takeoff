(function(window) {
  'use strict';

  window.ValidateInput = React.createClass({
    getInitialState: function(){
      return({errors: []});
    },

    componentWillReceiveProps: function(){
      this.setState({errors: []});
      var newErrors = [];
      if(this.props.inputs.origin === this.props.inputs.destination){
        newErrors.push("Destination cannot be the same as origin");
      }
      if(this.props.inputs.date !== ""){
        if(new Date(this.props.inputs.date) < new Date()){
          newErrors.push("Departure time must be in the future");
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
