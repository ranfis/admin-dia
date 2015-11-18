'use strict';

angular.module('diaApp')
  .service('CongressService', function ($http, WS, REQUEST){

    this.congresses = [];

    this.getAll = function (sessionId) {
      var params = {
        params:{
          session_id: sessionId
        }
      };
      return $http.get(WS+"/congress/list", params);
    };

    this.create = function(congress){
      return $http
        .post(WS+"/congress/add", congress,REQUEST.PLAIN)
        .then(function (res) {
          return (res.data.msg);
        });
    };

    this.update = function(congress){
      return $http
        .put(WS+"/congress/update", congress,REQUEST.PLAIN)
        .then(function (res) {
          return (res.data.msg);
        },function (err){
          throw new Error(err.message);
        });
    };

    this.delete = function(participantId,sessionId){
      var param = {
        session_id:sessionId,
        id:participantId
      };


      return $http
        .put(WS+"/congress/del", param,REQUEST.PLAIN)
        .then(function (res) {
          return (res.data.code === 0);
        },function (err){
          console.error("http",err);
          throw new Error(err.message);
        });
    };
  });
