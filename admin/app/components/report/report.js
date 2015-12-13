'use strict';


var ReportCtrl = function($scope, Session, WS, $rootScope){
  $scope.report = {
    year: {
      earning:"",
      overhead:""
    }
  };
  $rootScope.title = "Reportes";
  $rootScope.nav = "Reportes";
  var encodedSession = btoa(Session.id);
  $scope.save = function(index, form) {
    var location_url = "";
    switch(index) {
      case 1: {
        location_url = WS.REPORT.EARNINGS+encodedSession;
        break;
      }
      case 2: {
        location_url = WS.REPORT.OVERHEAD+encodedSession;
        break;
      }
      case 3: {
        location_url = WS.REPORT.EARNINGS+encodedSession+"?year="+$scope.report.year.earning;
        break;
      }
      case 4: {
        location_url = WS.REPORT.OVERHEAD+encodedSession+"?year="+$scope.report.year.overhead;
        break;
      }
    }
    if (!form.$valid){return;}
    window.location.href = location_url;
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
