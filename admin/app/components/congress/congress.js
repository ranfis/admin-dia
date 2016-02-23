'use strict';

angular.module('diaApp').service('CongressService', new GenericService("congress"));

angular.module('diaApp').config(
  new GenericController({
    serviceName: "CongressService",
    name: "Congresos",
    entity: "congress",
    listName: "congresses",
    resolveDeps: [{service: "SponsorService", list: "sponsors"}, {service: "ParticipantService", list: "participants"}],
    afterFetchList: function ($scope) {
      $scope["congresses"].forEach(function (congress) {
        congress.fecha_congreso = +congress.fecha_congreso.slice(0, 4);
      });
    },
    afterFetch: function ($scope, Helper) {
      $scope.congress.participantes = Helper.getIDs($scope.congress.participantes); // Retrieve the actual select value
      $scope.congress.patrocinio = $scope.congress.patrocinio.id; // Retrieve the actual select value
      //console.log("Esto va a correr cuando hagan el list",$scope);
    },
    beforeSubmit: function ($scope) {
      $scope.congress.fecha_congreso += "-00-00";
    }
  })
);

