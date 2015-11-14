'use strict';

angular.module('diaApp')
  .service('ParticipantService', function ($http, WS, REQUEST){
    this.participants = [];

    this.getAll = function (sessionId) {
      var params = {
        params:{
          session_id: sessionId
        }
      };
      return $http.get(WS+"/participant/list", params);
    };

    this.create = function(participant){
      return $http
        .post(WS+"/participant/add", participant,REQUEST.PLAIN)
        .then(function (res) {
          return (res.data.code === 0);
        }, function(err){
          console.error(err);
          throw new Error(err.message);
        });
    };

    this.update = function(participant){
      return $http
        .put(WS+"/participant/update", participant,REQUEST.PLAIN)
        .then(function (res) {
          return (res.data.code === 0);
        },function (err){
          console.error("http",err);
          throw new Error(err.message);
        });
    };

    this.delete = function(participantId,sessionId){
      var param = {
        session_id:sessionId,
        id:participantId
      };


      return $http
          .put(WS+"/participant/del", param,REQUEST.PLAIN)
        .then(function (res) {
          return (res.data.code === 0);
        },function (err){
          console.error("http",err);
          throw new Error(err.message);
        });
    };
  });
