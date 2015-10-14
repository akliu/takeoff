(function(window) {
  'use strict';

  window.ReservationItem = React.createClass({
    render: function(){
      var titleDate = moment(this.props.reservation.departure_time).format('dddd') +
          ", " + moment(this.props.reservation.departure_time).format('MMMM Do');

      var itemDate = moment(this.props.reservation.departure_time).format('lll');

      var originName = this.props.reservation.origin_name;
      var originCode = this.props.reservation.origin_code;

      var destinationName = this.props.reservation.destination_name;
      var destinationCode = this.props.reservation.destination_code;

      var aircraft = this.props.reservation.jet_id;


      return (
        <div className="reservation-index-item">
          <h3>To {this.props.reservation.destination_name} on {titleDate}</h3>
          <ul>
            <li>From: {originName} ({originCode})</li>
            <li>To: {destinationName} ({destinationCode})</li>
            <li>Departure Time: {itemDate}</li>
            <li>Aircraft: {aircraft}</li>
            <li><a href='#'>Edit</a>    <a href='#'>Cancel</a></li>
          </ul>
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
