(function(window) {
  'use strict';

  window.ReservationItem = React.createClass({
    render: function(){
      return (
        <div className="reservation-index-item">
          <h3>{moment(this.props.reservation.departure_time).format('MMMM Do')}</h3>
        </div>
      );
    }


  });

}(this));

          // <h3>To +{this.props.reservation.destination_name}+ on +
          //           this.props.reservation.departure_time</h3>
          // <ul>
          //   <li>Reservation Id: {this.props.reservation.id}</li>
          //   <li>Reservation user_id: {this.props.reservation.user_id}</li>
          //   <li>Reservation origin: {this.props.reservation.origin_name}</li>
          //   <li>Reservation destination: {this.props.reservation.destination_name}</li>
          //   <li>Reservation jet_id: {this.props.reservation.jet_id}</li>
          // </ul>
