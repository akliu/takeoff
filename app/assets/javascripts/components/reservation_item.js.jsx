(function(window) {
  'use strict';

  window.ReservationItem = React.createClass({
    render: function(){
      return (
        <div className="reservation-index-item">
          <ul>
            <li>Reservation Id: {this.props.reservation.id}</li>
            <li>Reservation user_id: {this.props.reservation.user_id}</li>
            <li>Reservation origin: {this.props.reservation.origin_name}</li>
            <li>Reservation destination: {this.props.reservation.destination_name}</li>
            <li>Reservation jet_id: {this.props.reservation.jet_id}</li>
          </ul>
        </div>
      );
    }


  });

}(this));
