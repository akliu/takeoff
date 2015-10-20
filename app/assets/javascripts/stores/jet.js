(function(root) {
  'use strict';

  var _jets = [];
  var CHANGE_EVENT = "change";

  var loadJets = function(jets){
    _jets = jets;
  };

  var JetStore = root.JetStore = $.extend({}, EventEmitter.prototype,{
    all: function(){
      return _jets.slice();
    },

    atAirportById: function(airportId){
      var jetsAtAirport = [];
      for(var i = 0; i < _jets.length; i++){
        if(_jets[i].airport_id === airportId){
          jetsAtAirport.push(_jets[i]);
        }
      }
      return jetsAtAirport;
    },

    findById: function(id){
      for(var i = 0; i < _jets.length; i++){
        if(_jets[i].id === id){
          return _jets[i];
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
        case JetConstants.JETS_RECEIVED:
          loadJets(action.payload);
          JetStore.emit(CHANGE_EVENT);
          break;
      }
    })
  });

}(this));
