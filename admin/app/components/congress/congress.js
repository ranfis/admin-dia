'use strict';

angular.module('diaApp').service('CongressService', new GenericService("congress"));

angular.module('diaApp').config(
  new GenericController("CongressService","Congresos","congress","congresses",
    [{service:"SponsorService",list:"sponsors"},{service:"ParticipantService",list:"participants"}],
  // After Fetch
  function($scope){
    $scope["congresses"].forEach(function(congress){
      congress.fecha_congreso = +congress.fecha_congreso.slice(0,4);
    });
    //console.log("Esto va a correr cuando hagan el list",$scope);
  },
  // Change Before Submit
  function($scope){
    $scope.congress.fecha_congreso+="-00-00";
    //console.log("Esto va a corer cuando hagan el save()",$scope);
  })
);

