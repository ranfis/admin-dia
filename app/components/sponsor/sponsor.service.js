'use strict';

angular.module('diaApp')
  .service('SponsorService', function ($http, WS, REQUEST){

    this.sponsors = [];

    this.getAll = function (sessionId) {
      var params = {
        params:{
          session_id: sessionId
        }
      };
      return $http.get(WS+"/sponsor/list", params);
    };

    this.create = function(sponsor){
      return $http
        .post(WS+"/sponsor/add", sponsor,REQUEST.PLAIN)
        .then(function (res) {
          return (res.data.code === 0);
        }, function(err){
          console.error(err);
        });
    };

    this.update = function(sponsor){
      console.log("update",sponsor);
      return $http
        .put(WS+"/sponsor/update", sponsor,REQUEST.PLAIN)
        .then(function (res) {
          console.log("http",res);
          return (res.data.code === 0);
        },function (err){
          console.error("http",err);
        });
    };
  });
