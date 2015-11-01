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
      return $http
        .get(WS+"/participant/list", params)
        .then(function(res) {
          return res.data.result;
        }, function(err){
          console.error(err);
        });
    };

    this.create = function(participant){
      console.log(participant);
      return $http
        .post(WS+"/participant/add", participant,REQUEST.PLAIN)
        .then(function (res) {
          return (res.data.code === 0);
        }, function(err){
          console.error(err);
        });
    };

    this.update = function(participant){
      console.log(participant);
      console.log("update",participant);
      return $http
        .put(WS+"/participant/update", participant,REQUEST.PLAIN)
        .then(function (res) {
          console.log("http",res);
          return (res.data.code === 0);
        },function (err){
          console.error("http",err);
        });
    };
  });
