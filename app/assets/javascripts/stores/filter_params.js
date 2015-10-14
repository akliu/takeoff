(function(root) {
  'use strict';

  var _params = {};
  var CHANGE_EVENT = "change";

  var FilterParamsStore = root.FilterParamsStore = $.extend({}, EventEmitter.prototype, {
    params: function(){
        return $.extend({}, _params);
    },
    addChangeListener: function(callback){
      this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback){
      this.removeChangeListener(CHANGE_EVENT, callback);
    },
    dispatcherID: AppDispatcher.register(function(payload){
      switch(payload.actionType){
        case FilterConstants.UPDATE_BOUNDS:
          _params.bounds = payload.bounds;
          FilterParamsStore.emit(CHANGE_EVENT);
          break;
      }
    })
  });


}(this));
