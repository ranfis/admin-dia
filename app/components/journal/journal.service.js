'use strict';

angular.module('diaApp')
  .service('JournalService', function ($http, WS, REQUEST){
    this.journals = [];

    this.getAll = function (sessionId) {
      var params = {
        params:{
          session_id: sessionId
        }
      };
      return $http.get(WS+"/journal/list", params);
    };

    this.create = function(journal){
      return $http
        .post(WS+"/journal/add", journal,REQUEST.PLAIN)
        .then(function (res) {
          return (res.data.code === 0);
        }, function(err){
          console.error(err);
          throw new Error(err.message);
        });
    };

    this.update = function(journal){
      return $http
        .put(WS+"/journal/update", journal,REQUEST.PLAIN)
        .then(function (res) {
          return (res.data.code === 0);
        },function (err){
          console.error("http",err);
          throw new Error(err.message);
        });
    };

    this.delete = function(journalId,sessionId){
      var param = {
        session_id:sessionId,
        id:journalId
      };


      return $http
        .put(WS+"/journal/del", param,REQUEST.PLAIN)
        .then(function (res) {
          return (res.data.code === 0);
        },function (err){
          console.error("http",err);
          throw new Error(err.message);
        });
    };
  });
