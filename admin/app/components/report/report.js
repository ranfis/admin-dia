'use strict';


var ReportCtrl = function($scope, Session, WS, $rootScope, $sce, ParticipantService, Helper){
  $rootScope.title = "Reportes";
  $rootScope.nav = "Reportes";
  $scope.report = {
    participant: 0
  };
  var encodedSession = btoa(Session.id);
  var final_location = "";

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
    if (!project) {
      final_location = location_url+encodedSession;
      console.log("hola");
    } else {
      final_location = location_url+encodedSession+"?researcher="+$scope.report.participant;

    }

    $scope.report_action = $sce.trustAsResourceUrl(final_location);

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
