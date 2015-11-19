'use strict';

angular.module('diaApp').service('Helper', function () {
  this.selectById = function(list,id){
    var match = list.filter(function(e){
      return (e.id === +id);
    });
    return match[0] || null;
  };

  this.getIDs = function(list){
    var ids=[];
    list.forEach(function (e) {
      ids.push(e.id);
    });
    return ids;
  };
});