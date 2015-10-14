(function(root) {
  'use strict';

  var _reservations =[];
  var CHANGE_EVENT = "change";

  var loadReservations = function(reservations){
    _reservations = reservations;
  };

  var ReservationStore = root.ReservationStore = $.extend({}, EventEmitter.prototype,{
    all: function(){
      return _reservations.slice();
    },

    addChangeListener: function(callback){
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback){
      this.removeListener(CHANGE_EVENT, callback);
    },

    dispatcherID: AppDispatcher.register(function(action){
      switch(action.actionType){
          case ReservationConstants.RESERVATIONS_RECEIVED:
            loadReservations(action.payload);
            ReservationStore.emit(CHANGE_EVENT);
      }
    })
  });
}(this));
