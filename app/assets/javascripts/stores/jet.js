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