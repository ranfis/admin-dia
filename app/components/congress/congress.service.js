'use strict';

angular.module('diaApp')
  .service('CongressService', function ($http, WS, REQUEST){

    this.getAll = function (sessionId) {
      var params = {
        params:{
          session_id: sessionId
        }
      };
      return $http
        .get(WS+"/congress/list", params)
        .success(function(data) {
          return data.result;
        });
    };

    this.create = function(congress){
      return $http
        .post(WS+"/congress/add", congress,REQUEST.PLAIN)
        .success(function (data) {
          console.log(data);
        });
    };
  });
