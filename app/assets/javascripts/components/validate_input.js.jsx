(function(window) {
  'use strict';

  window.ValidateInput = React.createClass({
    getInitialState: function(){
      return({errors: []});
    },

    componentWillReceiveProps: function(newProps){
      this.setState({errors: []});
      var year = moment(newProps.inputs.date).format('YYYY');
      var month = Number(moment(newProps.inputs.date).format('M')) - 1;
      var day = moment(newProps.inputs.date).format('D');
      var hour = Number(newProps.inputs.hour);
      var minute = newProps.inputs.minute;

      if(newProps.inputs.ampm === 'pm'){
        hour = hour + 12;
      }

      if(hour === 0 || minute === "" || newProps.inputs.ampm === ""){
        day = day + 1;
      }

      var reservationTime = new Date(year, month, day, hour, minute);
      if(newProps.inputs.errors.length === 0) {
        var newErrors = [];
        if(newProps.inputs.origin === newProps.inputs.destination  &&
              newProps.inputs.origin !== "" &&
              newProps.inputs.destination !== ""){
          newErrors.push("Destination cannot be the same as origin");
        }
        if(newProps.inputs.date !== ""){
          if(reservationTime < new Date()){
            newErrors.push("Departure date must be in the future");
          }
        }
        this.setState({errors: newErrors});
      }else{
        this.setState({errors: newProps.inputs.errors});
      }
    },

    render: function(){
      return(
        <div className="bg-danger">
          <ul>
            {
              this.state.errors.map(function(error){
                return(<li key={this.state.errors.indexOf(error)}>{error}</li>);
              }.bind(this))
            }
          </ul>
        </div>
      );
    }

  });
}(this));
