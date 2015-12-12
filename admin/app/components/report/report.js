'use strict';


var ReportCtrl = function($scope, Session, WS, $rootScope){
  $rootScope.title = "Reporte";
  $rootScope.nav = "Reporte";
  $scope.encodedSession = btoa(Session.id);
  $scope.save = function(index) {
    var location_url = "";
    switch(index) {
      case 1: {
        location_url = WS.REPORT_EARNINGS;
        break;
      }
      case 2: {
        location_url = WS.REPORT_OVERHEAD;
        break;
      }
    }
    window.location.href = location_url+$scope.encodedSession;
  }
};
angular.module('diaApp').controller(ReportCtrl)
  .config(function ($routeProvider, PATH, USER_ROLES) {
    $routeProvider
      .when(PATH.REPORT.LIST, {
        templateUrl: PATH.REPORT.SINGLE,
        data: {
          authorizedRoles: [USER_ROLES.ADMIN]
        },
        controller: ReportCtrl
      });
  });
