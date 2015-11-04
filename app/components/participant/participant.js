'use strict';

angular.module('diaApp')
  .config(function ($routeProvider) {

    var ParticipantsListCtrl = function ($scope, Session, ParticipantService) {
      ParticipantService.getAll(Session.id)
        .then(function (participants) {
          $scope.participants = participants.data.result;
          ParticipantService.participants = $scope.participants;
          $scope.hasParticipants = ($scope.participants.length >= 0);
        }, function(err){
          console.error(err);
        });
    };

    var ParticipantsCreateCtrl = function ($scope, Session, ParticipantService,$location) {
      $scope.participant = {
        session_id: Session.id
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
    };

    var ParticipantsDetailsCtrl = function ($scope, ParticipantService, $routeParams) {
      var id = $routeParams.id;
      $scope.participant = ParticipantService.participants.filter(function (el) {
        return (el.id === +id);
      })[0];
    };

    $routeProvider
      .when('/participantes', {
        templateUrl: 'components/participant/participants.html',
        controller: ParticipantsListCtrl,
        data: {
          authorizedRoles: ["ADMIN"]
        }
      })
      .when('/participantes/crear', {
        templateUrl: 'components/participant/participant.html',
        controller: ParticipantsCreateCtrl,
        data: {
          authorizedRoles: ["ADMIN"]
        }
      })
      .when('/participantes/:id', {
        templateUrl: 'components/participant/participant.html',
        controller: ParticipantsDetailsCtrl,
        data: {
          authorizedRoles: ["ADMIN"]
        }
      });
  });
