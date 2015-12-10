'use strict';

angular.module('diaApp').service('PublicationService', new GenericService("publication"));

angular.module('diaApp').config(
  new GenericController("PublicationService","Publicaciones","publication","publications",
    [{service:"JournalService",list:"journals"},{service:"ParticipantService",list:"participants"}],
    // After Fetch
    function($scope){
      $scope["publications"].forEach(function(publication){
        publication.date = +publication.date.slice(0,4);
      });
      //console.log("Esto va a correr cuando hagan el list",$scope);
    },
    // Change Before Submit
    function($scope){
      $scope.publication.date+="-00-00";
      //console.log("Esto va a corer cuando hagan el save()",$scope);
    })
);
