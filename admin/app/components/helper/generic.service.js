'use strict';

var GenericService = function(serviceName){
  return function ($http, WS, REQUEST){
    this.objectList = [];

    this.list = function (sessionId) {
      var params = {
        params:{
          session_id: sessionId
        }
      };
      return $http.get(WS+"/"+serviceName+"/list", params);
    };

    this.create = function(object){
      return $http
        .post(WS+"/"+serviceName+"/add", object,REQUEST.PLAIN)
        .then(function (res) {
          return (res.data.code === 0);
        }, function(err){
          console.error(err);
          throw new Error(err.message);
        });
    };

    this.update = function(object){
      return $http
        .put(WS+"/"+serviceName+"/update", object,REQUEST.PLAIN)
        .then(function (res) {
          return (res.data.code === 0);
        },function (err){
          console.error("http",err);
          throw new Error(err.message);
        });
    };

    this.delete = function(objectId,sessionId){
      var param = {
        session_id:sessionId,
        id:objectId
      };


      return $http
        .put(WS+"/"+serviceName+"/del", param,REQUEST.PLAIN)
        .then(function (res) {
          return (res.data.code === 0);
        },function (err){
          console.error("http",err);
          throw new Error(err.message);
        });
    };
  }
};
