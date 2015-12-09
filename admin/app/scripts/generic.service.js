'use strict';

var GenericService = function(serviceName){
  return function ($http, WS, Helper, REQUEST){
    this.list = function (sessionId) {
      var params = {
        params:{
          session_id: sessionId
        }
      };
      return $http.get(WS.LIST(serviceName), params).then(Helper.checkResult,Helper.handleErrors);
    };
    this.create = function(object){
      return $http
        .post(WS.ADD(serviceName), object,REQUEST.PLAIN).then(Helper.checkResult,Helper.handleErrors);
    };
    this.update = function(object){
      return $http
        .put(WS.UPDATE(serviceName), object,REQUEST.PLAIN).then(Helper.checkResult,Helper.handleErrors);
    };
    this.upsert = function(object){
      var f = function (){
        if(object.id){
          return $http.put(WS.UPDATE(serviceName), object,REQUEST.PLAIN);
        }
        else{
          return $http.post(WS.ADD(serviceName), object,REQUEST.PLAIN);
        }
      };
      return f().then(Helper.checkResult,Helper.handleErrors);
    };
    this.delete = function(objectId,sessionId){
      var param = {
        session_id:sessionId,
        id:objectId
      };
      return $http
        .put(WS.DELETE(serviceName), param,REQUEST.PLAIN)
        .then(function (res) {
          return (res.data.msg);
        },function (err){
          throw new Error(err.message);
        });
    };
  };
};

GenericService.toString();
