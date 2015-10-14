(function(window) {
  'use strict';

  window.Reservations = React.createClass({
    getInitialState: function(){
      return({reservations: ReservationStore.all()});
    },

    componentDidMount: function(){
      ReservationStore.addChangeListener(this._updateReservations);
      ApiUtil.fetchReservations();
    },

    _updateReservations: function(){
      this.setState({reservations: ReservationStore.all()});
    },

    render: function(){
      debugger
      return (
          <div>Reservations go here!</div>
      );
    }
  });

}(this));
