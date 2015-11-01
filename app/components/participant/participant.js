'use strict';

angular.module('diaApp')
  .config(function ($routeProvider) {


    $routeProvider
      .when('/participantes', {
        templateUrl: 'components/participant/participants.html',
        controllerAs: 'participantCtrl',
        controller: function ($scope, ParticipantService) {
          $scope.participants = [];
          ParticipantService.getAll($scope.currentUser.sessionId)
            .success(function (data) {
              $scope.participants = data.result;
            });
        }
      })
      .when('/participantes/crear', {
        templateUrl: 'components/participant/participant.html',
        controllerAs: 'participantCtrl',
        controller: function ($scope, ParticipantService,$location) {

          $scope.participant = {
            nombre:"Nombre",
            apellido:"Apellido",
          };

          $scope.addParticipant = function(){
            $scope.participant.session_id = $scope.currentUser.sessionId;
            ParticipantService.create($scope.participant)
              .then(function(){
                $scope.participant = {};
                $location.path( "/participantes" );
              },function(err){
                console.error(err);
              });
          };
        }
      })
      //.when('/congresos/:id', {
      //  templateUrl: 'components/congress/congress.html',
      //  controllerAs: 'congressCtrl',
      //  controller: function ($scope, CongressService, $routeParams) {
      //    var congresses = [];
      //    $scope.congress = {};
      //
      //    CongressService.getAll($scope.currentUser.sessionId)
      //      .success(function (data) {
      //        var id = $routeParams.id;
      //        congresses = data.result;
      //
      //        $scope.congress= congresses.filter(function (el) {
      //          return (el.id === +id);
      //        })[0];
      //      });
      //    // UPDATE
      //  }
      //});
  });
