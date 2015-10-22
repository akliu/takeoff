(function(window) {
  'use strict';

  window.Reservations = React.createClass({
    getInitialState: function(){
      return({reservations: ReservationStore.futureReservations()});
    },

    componentDidMount: function(){
      ReservationStore.addChangeListener(this._updateReservations);
      ApiUtil.fetchFutureReservations();
      ApiUtil.fetchJets();
    },

    componentWillUnmount: function(){
      ReservationStore.removeChangeListener(this._updateReservations);
    },

    _updateReservations: function(){
      this.setState({reservations: ReservationStore.futureReservations()});
    },

    render: function(){
      return (
          <div className="reservation-list modal-content">
            <h2>Reservations</h2>
              {
                this.state.reservations.map(function(reservation){
                  return <ReservationItem reservation={reservation} key={reservation.id}/>;
                })
              }
          </div>
      );
    }
  });

}(this));
