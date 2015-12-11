'use strict';

angular.module('diaApp').service('ProjectService', new GenericService("project"));

angular.module('diaApp').config(
  new GenericController("ProjectService","Proyectos","project","projects",
    [
      {service:"ParticipantService",list:"participants"},
      {service:"InstitutionService",list:"institutions"},
      {service:"UnitService",list:"units"},
      {service:"CurrencyService",list:"currencies"},
      {service:"FundService",list:"funds"}
    ],
    // After Fetch List
    function($scope){
      $scope["projects"].forEach(function(project){
        project.date_application = +project.date_application.slice(0,4);
        project.date_start = +project.date_start.slice(0,4);
      });
    },
    // After Fetch
    function ($scope,Helper) {
      console.info($scope);
      $scope["project"].participantes = Helper.getIDs($scope["project"].participantes); // Retrieve the actual select value
      $scope["project"].journal = $scope["project"].journal.id; // Retrieve the actual select value
    },
    // Change Before Submit
    function($scope){
      $scope.project.date_application+="-00-00";
      $scope.project.date_start+="-00-00";
    })
);
