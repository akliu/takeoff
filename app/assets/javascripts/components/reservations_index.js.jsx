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
      return (
          <div>
            <h2>Reservations</h2>
              {
                this.state.reservations.map(function(reservation){
                  return <ReservationItem reservation={reservation} />;
                })
              }
          </div>
      );
    }
  });

}(this));
