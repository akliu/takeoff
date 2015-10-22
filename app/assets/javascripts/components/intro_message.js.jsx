(function() {
  'use strict';

  window.IntroMessage = React.createClass({
    render: function(){
      var message;
      if(this.props.render){
        message = (
          <h4>
            Welcome to Takeoff! Select an airport to start a new reservation
          </h4>
        );
      } else{
        message = (
          <h4>
            Finding airports near you...
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
