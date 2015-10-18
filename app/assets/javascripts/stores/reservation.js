(function(root) {
  'use strict';

  var _futureReservations =[];
  var _pastReservations = [];
  var CHANGE_EVENT = "change";

  var loadFutureReservations = function(reservations){
    _futureReservations = reservations;
  };

  var loadPastReservations = function(reservations){
    _pastReservations = reservations;
  };

  var ReservationStore = root.ReservationStore = $.extend({}, EventEmitter.prototype,{
    futureReservations: function(){
      return _futureReservations.slice();
    },

    pastReservations: function(){
      return _pastReservations.slice();
    },

    find: function(id){
      for(var i = 0; i < _futureReservations.length; i++){
        if(_futureReservations[i].id === id){
          return _futureReservations[i];
        }
      }
    },

    addChangeListener: function(callback){
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback){
      this.removeListener(CHANGE_EVENT, callback);
    },

    dispatcherID: AppDispatcher.register(function(action){
      switch(action.actionType){
          case ReservationConstants.FUTURE_RESERVATIONS_RECEIVED:
            loadFutureReservations(action.payload);
            ReservationStore.emit(CHANGE_EVENT);
            break;
          case ReservationConstants.PAST_RESERVATIONS_RECEIVED:
            loadPastReservations(action.payload);
            ReservationStore.emit(CHANGE_EVENT);
            break;
      }
    })
  });
}(this));
