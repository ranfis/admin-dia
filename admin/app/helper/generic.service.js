'use strict';

var GenericService = function(serviceName){
  return function ($http, WS, REQUEST){
    this.list = function (sessionId) {
      var params = {
        params:{
          session_id: sessionId
        }
      };
      return $http.get(WS.LIST(serviceName), params);
    };
    this.create = function(object){
      return $http
        .post(WS.ADD(serviceName), object,REQUEST.PLAIN)
        .then(function (res) {
          return (res.data.msg);
        }, function(err){
          throw new Error(err.message);
        });
    };
    this.update = function(object){
      return $http
        .put(WS.UPDATE(serviceName), object,REQUEST.PLAIN)
        .then(function (res) {
          return (res.data.msg);
        },function (err){
          throw new Error(err.message);
        });
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
