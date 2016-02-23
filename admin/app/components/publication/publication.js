'use strict';

angular.module('diaApp').service('PublicationService', new GenericService("publication"));

angular.module('diaApp').config(
  new GenericController(
    {
      serviceName: "PublicationService",
      name: "Publicaciones",
      entity: "publication",
      listName: "publications",
      resolveDeps: [{service: "JournalService", list: "journals"}, {
        service: "ParticipantService",
        list: "participants"
      }],
      afterFetchList: function ($scope) {
        $scope["publications"].forEach(function (publication) {
          publication.date = +publication.date.slice(0, 4);
        });
      },
      afterFetch: function ($scope, Helper) {
        $scope["publication"].participantes = Helper.getIDs($scope["publication"].participantes); // Retrieve the actual select value
        $scope["publication"].journal = $scope["publication"].journal.id; // Retrieve the actual select value
      },
      beforeSubmit: function ($scope) {
        $scope["publication"].has_intellectual_prop = $scope["publication"].has_intellectual_prop || false;
        $scope.publication.date += "-00-00";
      }
    })
);
