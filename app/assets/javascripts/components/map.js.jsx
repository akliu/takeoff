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
        return({airports: AirportStore.all()});
    },

    componentDidMount: function(){
      AirportStore.addChangeListener(this._updateAirports);
      var map = React.findDOMNode(this.refs.map);


      this.mapCenter(function(userLocation){
        //default to SF if geolocation fails
        if(JSON.stringify(userLocation) === "{}"){
          userLocation = {lat: 37.7758, lng: -122.435};
        }
        var mapOptions = {
          center: userLocation,
          zoom: 9
        };
        this.map = new google.maps.Map(map, mapOptions);
        this.registerListeners();
        ApiUtil.fetchAirports();
      }.bind(this));
        FilterParamsStore.addChangeListener(this._filtersChanged);
        this.markers = [];
    },

    _filtersChanged: function(){
      ApiUtil.fetchAirports(FilterParamsStore.params());
    },

    _updateAirports: function(){
      var toRemove = this.markers.slice();
      this.setState({airports: AirportStore.all()});
      var toAdd = [];

      this.state.airports.forEach(function(airport, idx){
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
      var pos = new google.maps.LatLng(airport.lat, airport.lng);
      var marker = new google.maps.Marker({
        position: pos,
        map: this.map,
        airportId: airport.id
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

    mapCenter: function(callback) {
      var location = {};
      navigator.geolocation.getCurrentPosition(
        function(pos) {
          location["lat"] = pos.coords.latitude;
          location["lng"] = pos.coords.longitude;
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
        <div className="map" ref="map"></div>
      );
    }
  });

}(this));
