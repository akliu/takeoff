(function(root) {
  'use strict';

  var _airports = [];
  var CHANGE_EVENT = "change";

  var loadAirports = function(airports){
    _airports = airports;
  };

  var AirportStore = root.AirportStore = $.extend({}, EventEmitter.prototype, {
    all: function(){
      return _airports.slice();
    },

    addChangeListener: function(callback){
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback){
      this.removeListener(CHANGE_EVENT, callback);
    },

    dispatcherID: AppDispatcher.register(function(action){

        debugger
      switch(action.actionType){
        case AirportConstants.AIRPORTS_RECEIVED:
          loadAirports(action.payload);
          AirportStore.emit(CHANGE_EVENT);
          break;
      }
    })
  });

}(this));
