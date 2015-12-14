'use strict';

angular.module('diaApp').service('DashboardService', function ($http, WS, Helper){
  this.list = function (sessionId) {
    var params = {
      params:{
        session_id: sessionId
      }
    };
    return $http.get(WS.DASHBOARD, params).then(Helper.checkResult,Helper.handleErrors);
  };
});

var DashboardCtrl = function($scope, Session, Alert, DashboardService, MESSAGES, $rootScope){
  $rootScope.title = "Dashboard";
  $rootScope.nav = "Dashboard";

  DashboardService.list(Session.id)
    .then(function (res) {
      $scope.dashboard = res.data.result;
      //console.log($scope.dashboard);
    }, function (err) {
      Alert.error(err.message,MESSAGES.ERROR_TEXT);
    });
};
angular.module('diaApp').controller(DashboardCtrl)
  .config(function ($routeProvider, PATH, USER_ROLES) {
    $routeProvider
      .when('/', {
        templateUrl: PATH.DASHBOARD.SINGLE,
        data: {
          authorizedRoles: [USER_ROLES.ADMIN]
        },
        controller: DashboardCtrl
      })
      .otherwise({
        templateUrl: PATH.ERROR404.SINGLE
      });
  });

