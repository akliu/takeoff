(function(root) {
  'use strict';

  var _mapParams = {};
  var MAP_CHANGE_EVENT = "map_change";

  var FilterParamsStore = root.FilterParamsStore = $.extend({}, EventEmitter.prototype, {
    mapParams: function(){
        return $.extend({}, _mapParams);
    },
    addMapChangeListener: function(callback){
      this.on(MAP_CHANGE_EVENT, callback);
    },
    removeMapChangeListener: function(callback){
      this.removeChangeListener(MAP_CHANGE_EVENT, callback);
    },
    dispatcherID: AppDispatcher.register(function(payload){
      switch(payload.actionType){
        case FilterConstants.UPDATE_BOUNDS:
          _mapParams.bounds = payload.bounds;
          FilterParamsStore.emit(MAP_CHANGE_EVENT);
          break;
      }
    })
  });
}(this));
