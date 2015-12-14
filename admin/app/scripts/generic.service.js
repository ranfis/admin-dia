'use strict';

var GenericService = function(serviceName){
  return function ($http, WS, ENV,Helper, REQUEST){
    this.list = function (sessionId) {
      var params = {
        params:{
          session_id: sessionId
        }
      };
      return $http.get(ENV.WS_URL+WS.LIST(serviceName), params)
        .then(Helper.checkResult,Helper.handleErrors);
    };
    this.create = function(object){
      return $http
        .post(ENV.WS_URL+WS.ADD(serviceName), object,REQUEST.PLAIN)
        .then(Helper.checkResult,Helper.handleErrors);
    };
    this.update = function(object){
      return $http
        .put(ENV.WS_URL+WS.UPDATE(serviceName), object,REQUEST.PLAIN)
        .then(Helper.checkResult,Helper.handleErrors);
    };
    this.upsert = function(object){
      var f = function (){
        if(object.id){
          return $http.put(ENV.WS_URL+WS.UPDATE(serviceName), object,REQUEST.PLAIN);
        }
        else{
          return $http.post(ENV.WS_URL+WS.ADD(serviceName), object,REQUEST.PLAIN);
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
        .put(ENV.WS_URL+WS.DELETE(serviceName), param,REQUEST.PLAIN)
        .then(Helper.checkResult,Helper.handleErrors);
    };
  };
};
GenericService.toString();
