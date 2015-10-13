// {lat: 37.7758, lng: -122.435}

(function(window) {
  'use strict';

  window.Map = React.createClass({
    componentDidMount: function(){
      console.log("map mounted");
      var map = React.findDOMNode(this.refs.map);
      var userLocation = this.mapCenter();
      if(userLocation = {}){
        userLocation = {lat: 37.7758, lng: -122.435}
      }
      var mapOptions = {
        center: userLocation,
        zoom: 8
      };
      this.map = new google.maps.Map(map, mapOptions);
    },

    mapCenter: function() {
      var location = {};
      navigator.geolocation.getCurrentPosition(
        function(pos) {
          location["lat"] = pos.coords.latitude;
          location["lng"] = pos.coords.longitude;
        },
        function(err) {
          console.log('error');
        }
      );

      return location;
    },

    render: function(){
      return (
        <div className="map" ref="map"></div>
      );
    }
  });

}(this));
