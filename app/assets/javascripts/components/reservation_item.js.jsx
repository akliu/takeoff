(function(window) {
  'use strict';

  window.ReservationItem = React.createClass({
    mixins: [ReactRouter.History],

    getInitialState: function(){
      return({aircraftOwner: ""});
    },

    componentDidMount: function(){
      JetStore.addChangeListener(this._updateOwner);
      // ApiUtil.fetchJets({origin: this.props.reservation.origin_name});
      ApiUtil.fetchJets();
    },

    _updateOwner: function(){
      var jetOwner = JetStore.findById(this.props.reservation.jet_id).owner_name;
      // if(typeof jetOwner !== "undefined"){
        jetOwner = jetOwner.charAt(0).toUpperCase() + jetOwner.slice(1);
        this.setState({aircraftOwner: jetOwner});
      // }
    },

    _handleDelete: function(event){
      event.preventDefault();
      ApiUtil.deleteReservation(this.props.reservation.id);
    },

    _handleEdit: function(event){
      event.preventDefault();
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

      var aircraftModel = this.props.reservation.jet;

      var aircraft = this.state.aircraftOwner + "'s " + aircraftModel;

      var price = this.props.reservation.price;

      var editable;
      if(this.props.past !== "true"){
        editable = (
          <li>
            <a href onClick={this._handleEdit}>Edit</a>&nbsp;
            <a href onClick={this._handleDelete}>Cancel</a>
          </li>
        );
      }

      return (
        <div className="reservation-index-item">
          <h3>To {this.props.reservation.destination_name} on {titleDate}</h3>
          <ul>
            <li>From: {originName} ({originCode})</li>
            <li>To: {destinationName} ({destinationCode})</li>
            <li>Departure Time: {itemDate}</li>
            <li>Aircraft: {aircraft}</li>
            <li>Total Fare: ${price.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}</li>
            {editable}
          </ul>
            <JetImages jet={aircraftModel} />
        </div>
      );
    }


  });

}(this));
