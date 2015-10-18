(function(window) {
  'use strict';

  window.PastReservations = React.createClass({
    getInitialState: function(){
      return({reservations: ReservationStore.pastReservations()});
    },

    componentDidMount: function(){
      debugger
      ReservationStore.addChangeListener(this._updateReservations);
      ApiUtil.fetchPastReservations();
    },

    _updateReservations: function(){
      this.setState({reservations: ReservationStore.pastReservations()});
    },

    render: function(){
      return (
          <div className="reservation-list modal-content">
            <h2>Past Trips</h2>
              {
                this.state.reservations.map(function(reservation){
                  return <ReservationItem reservation={reservation}
                                          key={reservation.id}
                                          past="true"/>;
                })
              }
          </div>
      );
    }
  });

}(this));
