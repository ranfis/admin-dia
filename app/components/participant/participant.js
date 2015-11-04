'use strict';

angular.module('diaApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/participantes', {
        templateUrl: 'components/participant/participants.html',
        controllerAs: 'participantCtrl',
        controller: function ($scope, ParticipantService) {
          $scope.participants = [];
          $scope.hasParticipant = false;

          ParticipantService.getAll($scope.currentUser.sessionId)
            .then(function (participants) {
              $scope.participants = participants;
              ParticipantService.participants = $scope.participants;
              $scope.hasParticipants = ($scope.participants.length >= 0);
            }, function(err){
              console.error(err);
            });
        }
      })
      .when('/participantes/crear', {
        templateUrl: 'components/participant/participant.html',
        controllerAs: 'participantCtrl',
        controller: function ($scope, ParticipantService,$location) {

          $scope.participant = {
            session_id: $scope.currentUser.sessionId
          };

          $scope.addParticipant = function(){
            ParticipantService.create($scope.participant)
              .then(function(ok){
                console.log(ok);
                if(ok){
                  $scope.participant = {};
                  $location.path( "/participantes" );
                }
              },function(err){
                console.error(err);
              });
          };
        }
      })
      .when('/participantes/:id', {
        templateUrl: 'components/participant/participant.html',
        controllerAs: 'participantCtrl',
        controller: function ($scope, ParticipantService, $routeParams) {
          $scope.participant = {};

          var id = $routeParams.id;
          $scope.participant = ParticipantService.participants.filter(function (el) {
            return (el.id === +id);
          })[0];
        }
      });
  });
