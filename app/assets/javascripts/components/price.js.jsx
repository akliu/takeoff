(function(window) {
  'use strict';

  window.Price = React.createClass({
    // getInitialState: function(){
    //   return({price: ""});
    // },

    componentWillReceiveProps: function(newProps){
      if(this.props.destination !== newProps.destination || this.props.origin !== newProps.origin){
        this.calculatePrice(newProps);
          }
    },

    getDistance: function(lat1, lon1, lat2, lon2){
      var R = 6371; // Radius of the earth in km
      var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
      var dLon = this.deg2rad(lon2-lon1);
      var a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ;
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      var d = R * c; // Distance in km
      return d;
    },

    deg2rad: function(deg){
      return deg * (Math.PI/180);
    },

    calculatePrice: function(newProps){
      var origin = AirportStore.findByName(newProps.origin);
      var destination = AirportStore.findByName(newProps.destination);
      var newPrice = "";
      if(JSON.stringify(origin) !== "{}" && JSON.stringify(destination) !== "{}"){
        newPrice = (10 * this.getDistance(origin.lat, origin.lng,
                      destination.lat, destination.lng) + 2000).toFixed(2);
      }
      // this.setState({price: newPrice});
      newProps.updateForm(newPrice);
      // return newPrice;
    },

    render: function(){
      // var price = this.calculatePrice();
      var formattedPrice = this.props.price;
      if(formattedPrice !== ""){
        if(typeof formattedPrice === "string"){
          formattedPrice = "$" + formattedPrice.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        } else {
          formattedPrice = "$" + formattedPrice.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        }
      }

      return (
        <div>
          Total Fare: {formattedPrice}
        </div>
      );
    }

  });

}(this));
