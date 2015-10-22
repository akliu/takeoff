(function() {
  'use strict';

  window.IntroMessage = React.createClass({
    getInitialState: function(){
        var flyPlane = window.setInterval(this.movePlane, 50);
        return(
          {
            waiting: "Finding airports near you...",
            flyPlane: flyPlane
          }
        );
    },

    movePlane: function(){

      var newMessage = this.state.waiting + ".";
      if(newMessage.length > 100){
        newMessage = "Finding airports near you...";
      }

      this.setState({waiting: newMessage});
    },

    render: function(){
      var message;
      if(this.props.render){
        window.clearInterval(this.state.flyPlane);
        message = (
          <h4>
            Welcome to Takeoff! Select an airport to start a new reservation

          </h4>
        );
      } else{
        message = (
          <h4>
            {this.state.waiting}
            <img src="http://res.cloudinary.com/dx1lykanb/image/upload/c_scale,w_20/v1445539959/gulfstream_650/departing_flight.png" />
          </h4>
        );
      }

      return (
        <div className="intro modal-content">
          {message}
        </div>
      );
    }
  });

}());
