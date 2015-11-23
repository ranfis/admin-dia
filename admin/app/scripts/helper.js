'use strict';

angular.module('diaApp')
  .service('Helper', function (MESSAGES) {
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
  this.checkResult = function(res){
    console.log("checkResult");
    if(res.data.msg !== MESSAGES.OK){
      throw new Error(res.data.msg);
    }
    return res;
  };
  this.handleErrors = function(){
    console.log("handleErrors");
    throw new Error(MESSAGES.ERROR.NO_INTERNET);
  };
});
