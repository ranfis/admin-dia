'use strict';

angular.module('diaApp').service('CurrencyService', function ($http, WS, Helper){
    this.list = function (sessionId) {
      var params = {
        params:{
          session_id: sessionId
        }
      };
      return $http.get(WS.GET("currency"), params).then(Helper.checkResult,Helper.handleErrors);
    };
});
