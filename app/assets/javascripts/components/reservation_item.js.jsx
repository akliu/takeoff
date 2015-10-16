(function(window) {
  'use strict';

  window.ReservationItem = React.createClass({
    mixins: [ReactRouter.History],

    _handleDelete: function(event){
      event.preventDefault();
      ApiUtil.deleteReservation(this.props.reservation.id);
    },

    _handleEdit: function(event){
      event.preventDefault();
      debugger
      this.history.pushState(null, "reservation/edit", {id: this.props.reservation.id});
    },

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
            <li>
              <a href onClick={this._handleEdit}>Edit</a>
              <a href onClick={this._handleDelete}>Cancel</a>
            </li>
          </ul>
        </div>
      );
    }


  });

}(this));
