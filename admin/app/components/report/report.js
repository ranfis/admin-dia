'use strict';


var ReportCtrl = function($scope, Session, WS, $rootScope, $sce, ParticipantService, Helper){
  $rootScope.title = "Reportes";
  $rootScope.nav = "Reportes";
  $scope.report = {
    participant: 0
  };
  var encodedSession = btoa(Session.id);


  ParticipantService.list(Session.id)
    .then(function(res){
      $scope.participants = res.data.result;
    });

  $scope.save = function(index, form, project) {
    var location_url = "";
    switch(index) {
      case 1: {
        location_url = WS.REPORT.EARNINGS.SIMPLE;
        break;
      }
      case 2: {
        location_url = WS.REPORT.EARNINGS.OVERHEAD;
        break;
      }
      case 3: {
        location_url = WS.REPORT.EARNINGS.TOTALBOTH;
        break;
      }
      case 4: {
        location_url = WS.REPORT.PROJECTS.QUANTITY;
        break;
      }
      case 5: {
        location_url = WS.REPORT.PROJECTS.SIMPLE;
        break;
      }
      case 6: {
        location_url = WS.REPORT.CONGRESS;
        break;
      }
      case 7: {
        location_url = WS.REPORT.PUBLICATION;
        break;
      }
      case 8: {
        location_url = WS.REPORT.ANNUAL;
        break;
      }
    }
    if (!form.$valid){return;}
    //window.location.href = location_url;

      $scope.report_action = $sce.trustAsResourceUrl(location_url+encodedSession);

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
