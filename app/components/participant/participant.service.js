'use strict';

angular.module('diaApp')
  .service('ParticipantService', function ($http, WS, REQUEST){

    this.getAll = function (sessionId) {
      var params = {
        params:{
          session_id: sessionId
        }
      };
      return $http
        .get(WS+"/participant/list", params)
        .success(function(data) {
          return data.result;
        });
    };

    this.create = function(participant){
      return $http
        .post(WS+"/participant/add", participant,REQUEST.PLAIN)
        .success(function (data) {
          console.log(data);
        });
    };
  });
