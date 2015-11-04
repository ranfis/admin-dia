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
          return (res.data.code === 0);
        });
    };
  });
