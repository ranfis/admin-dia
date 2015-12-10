'use strict';

angular.module('diaApp').service('ProjectService', new GenericService("project"));

angular.module('diaApp').config(
  new GenericController("ProjectService","Proyectos","project","projects",
    [{service:"FundService",list:"funds"},{service:"ParticipantService",list:"participants"}],
    // After Fetch
    function($scope){
      $scope["projects"].forEach(function(project){
        project.date_application = +project.date_application.slice(0,4);
        project.date_start = +project.date_start.slice(0,4);
      });
      //console.log("Esto va a correr cuando hagan el list",$scope);
    },
    // Change Before Submit
    function($scope){
      $scope.project.date_application+="-00-00";
      $scope.project.date_start+="-00-00";

      //console.log("Esto va a corer cuando hagan el save()",$scope);
    })
);
