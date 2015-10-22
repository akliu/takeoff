// {lat: 37.7758, lng: -122.435}

(function(window) {
  'use strict';

  function _getCoordsObj(latLng) {
    return {
      lat: latLng.lat(),
      lng: latLng.lng()
    };
  }

  window.Map = React.createClass({
    getInitialState: function(){
        return(
          {
            airports: AirportStore.inView(),
            renderIntro: false
          }
      );
    },

    componentDidMount: function(){
      AirportStore.addChangeListener(this._updateAirports);
      var map = React.findDOMNode(this.refs.map);


      this.mapCenter(function(userLocation){
        //default to SF if geolocation fails
        this.setState({renderIntro: true});
        if(JSON.stringify(userLocation) === "{}"){
          userLocation = {lat: 37.7758, lng: -122.435};
        }
        var mapOptions = {
          center: userLocation,
          zoom: 9,
          //light-style
          // styles: [{"featureType":"landscape","stylers":[{"hue":"#FFBB00"},{"saturation":43.400000000000006},{"lightness":37.599999999999994},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#FFC200"},{"saturation":-61.8},{"lightness":45.599999999999994},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":51.19999999999999},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":52},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#0078FF"},{"saturation":-13.200000000000003},{"lightness":2.4000000000000057},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#00FF6A"},{"saturation":-1.0989010989011234},{"lightness":11.200000000000017},{"gamma":1}]}]
          //dark-style
          styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#000000"},{"lightness":13}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#144b53"},{"lightness":14},{"weight":1.4}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#08304b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#0c4152"},{"lightness":5}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0b434f"},{"lightness":25}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#0b3d51"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"transit","elementType":"all","stylers":[{"color":"#146474"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#021019"}]}]
          //apple-style
          // styles: [{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"color":"#f7f1df"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#d0e3b4"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.medical","elementType":"geometry","stylers":[{"color":"#fbd3da"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#bde6ab"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffe15f"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#efd151"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"black"}]},{"featureType":"transit.station.airport","elementType":"geometry.fill","stylers":[{"color":"#cfb2db"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#a2daf2"}]}]
        };
        this.map = new google.maps.Map(map, mapOptions);
        this.registerListeners();
        ApiUtil.fetchAllAirports();
        var marker = new google.maps.Marker({
          // icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          icon: "http://maps.google.com/mapfiles/kml/shapes/placemark_circle_highlight.png",
          position: userLocation,
          map: this.map,
          animation: google.maps.Animation.DROP
        });
      }.bind(this));
        FilterParamsStore.addMapChangeListener(this._filtersChanged);
        this.markers = [];
    },

    componentWillUnmount: function(){
      AirportStore.removeChangeListener(this._updateAirports);
    },

    _filtersChanged: function(){
      ApiUtil.fetchAirports(FilterParamsStore.mapParams());
    },

    _updateAirports: function(){
      var toRemove = this.markers.slice();
      this.setState({airports: AirportStore.inView()});
      var toAdd = [];

      this.state.airports.forEach(function(airport){
        var idx = -1;
        //check if bench is already on map as a marker
        for(var i = 0; i < toRemove.length; i++){
          if(toRemove[i].airportId == airport.id){
            idx = i;
            break;
          }
        }
        if(idx === -1){
          //if it's not already on the map, we need to add a marker
          toAdd.push(airport);
        } else {
          //if it IS already on the map AND in the store, we don't need
          //to remove it
          toRemove.splice(idx, 1);
        }
      });
      toAdd.forEach(this._drawAirport);
      toRemove.forEach(this._removeAirport);
    },

    _drawAirport: function(airport){
      var that = this;
      var pos = new google.maps.LatLng(airport.lat, airport.lng);
      var marker = new google.maps.Marker({
        // icon: "http://maps.google.com/mapfiles/kml/shapes/airports.png",
        icon: "http://maps.google.com/mapfiles/kml/pal2/icon56.png",
        position: pos,
        map: this.map,
        airportId: airport.id,
        animation: google.maps.Animation.DROP
      });
      marker.addListener('click', function(){
        that.onMarkerClick(airport);
      });
      this.markers.push(marker);
    },

    _removeAirport: function(marker){
      for(var i = 0; i < this.markers.length; i++){
        if (this.markers[i].airportId === marker.airportId){
          this.markers[i].setMap(null);
          this.markers.splice(i, 1);
          break;
        }
      }
    },

    onMarkerClick: function(airport){
      this.props.history.pushState(null, "reservations/new", airport);
    },

    mapCenter: function(callback) {
      var location = {};
      navigator.geolocation.getCurrentPosition(
        function(pos) {
          location.lat = pos.coords.latitude;
          location.lng = pos.coords.longitude;
          callback(location);
        },
        function(err) {
          console.log('error');
          callback(location);
        }
      );

    },

    registerListeners: function(){
      var that = this;
      google.maps.event.addListener(this.map, 'idle', function(){
        var mapBounds = that.map.getBounds();
        var northEast = _getCoordsObj(mapBounds.getNorthEast());
        var southWest = _getCoordsObj(mapBounds.getSouthWest());
        //actually issue the request

        var bounds = {
          northEast: northEast,
          southWest: southWest
        };
        FilterActions.updateBounds(bounds);
      });

    },

    render: function(){
      return (
        <div className="map-container">
          <IntroMessage render={this.state.renderIntro} />
          <div className="map" ref="map"></div>
        </div>
      );
    }
  });

}(this));
