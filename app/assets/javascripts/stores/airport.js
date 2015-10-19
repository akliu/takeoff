(function(root) {
  'use strict';

  var _airportsInView = [];
  var _airports = [];
  var CHANGE_EVENT = "change";

  var loadAirports = function(airports){
    _airportsInView = airports;
  };

  var loadAllAirports = function(airports){
    _airports = airports;
  };

  var AirportStore = root.AirportStore = $.extend({}, EventEmitter.prototype, {
    all: function(){
      return _airports.slice();
    },

    inView: function(){
      return _airportsInView.slice();
    },

    findByName: function(name){
      for(var i = 0; i < _airports.length; i++){
        if(_airports[i].name === name){
          return _airports[i];
        }
      }
      return {};
    },

    addChangeListener: function(callback){
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback){
      this.removeListener(CHANGE_EVENT, callback);
    },

    dispatcherID: AppDispatcher.register(function(action){

      switch(action.actionType){
        case AirportConstants.AIRPORTS_RECEIVED:
          loadAirports(action.payload);
          AirportStore.emit(CHANGE_EVENT);
          break;
        case AirportConstants.ALL_AIRPORTS_RECEIVED:
          loadAllAirports(action.payload);
          AirportStore.emit(CHANGE_EVENT);
          break;
      }
    })
  });

}(this));
