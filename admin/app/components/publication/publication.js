'use strict';

angular.module('diaApp').service('PublicationService', new GenericService("publication"));

angular.module('diaApp').config(
  new GenericController("PublicationService","Publicaciones","publication","publications",
    [{service:"JournalService",list:"journals"},{service:"ParticipantService",list:"participants"}],
    // After Fetch List
    function($scope){
      $scope["publications"].forEach(function(publication){
        publication.date = +publication.date.slice(0,4);
      });
    },
    // After Fetch
    function ($scope,Helper) {
      $scope["publication"].participantes = Helper.getIDs($scope["publication"].participantes); // Retrieve the actual select value
      $scope["publication"].journal = $scope["publication"].journal.id; // Retrieve the actual select value
    },
    // Change Before Submit
    function($scope){
      $scope["publication"].has_intellectual_prop = $scope["publication"].has_intellectual_prop || false;
      $scope.publication.date+="-00-00";
    })
);
