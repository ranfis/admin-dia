'use strict';

angular.module('diaApp').service('ProjectService', new GenericService("project"));

angular.module('diaApp').config(
  new GenericController("ProjectService","Proyectos","project","projects",
    [{service:"FundService",list:"funds"},{service:"ParticipantService",list:"participants"}],
    // After Fetch List
    function($scope){
      $scope["projects"].forEach(function(project){
        project.date_application = +project.date_application.slice(0,4);
        project.date_start = +project.date_start.slice(0,4);
      });
      //console.log("Esto va a correr cuando hagan el list",$scope);
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

      //console.log("Esto va a corer cuando hagan el save()",$scope);
    })
);
