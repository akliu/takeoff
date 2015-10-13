(function(window) {
  'use strict';

  window.Map = React.createClass({
    componentDidMount: function(){
      console.log("map mounted");
      var map = React.findDOMNode(this.refs.map);
      var mapOptions = {
        center: {lat: 37.7758, lng: -122.435},
        zoom: 13
      };
      this.map = new google.maps.Map(map, mapOptions);
    },

    render: function(){
      return (
        <div className="map" ref="map"></div>
      );
    }
  });

}(this));
