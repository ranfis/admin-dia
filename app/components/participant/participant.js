'use strict';

App.service('ParticipantService', new GenericService("participant"));

App.config(function ($routeProvider) {

    var ParticipantsListCtrl = function ($scope, Session, ParticipantService) {
      ParticipantService.list(Session.id)
        .then(function (res) {
          $scope.participants = res.data.result;
          ParticipantService.participants = $scope.participants;
        }, function(err){
          show.error(err.message,"¡Error!");
        });

      $scope.deleteParticipant = function(id,index){
        show.confirm("Este participante se borrará","¿Está seguro?","Si, borrar",function(){
          ParticipantService.delete(id,Session.id)
            .then(function (ok) {
              if (ok) {
                $scope.participants.splice(index, 1);
                show.success("El participante se ha borrado con exito","¡Participante borrado!");
              }
            }, function (err) {
              show.error(err.message,"¡Error!");
            });
        });
      }
    };

    var ParticipantsCreateCtrl = function ($scope, Session, ParticipantService,$location) {
      $scope.participant = {
        session_id: Session.id
      };
      $scope.addParticipant = function(form){
        if (!form.$valid) return;
        ParticipantService.create($scope.participant)
          .then(function(ok){
            if(ok){
              $scope.participant = {};
              show.success("El participante se ha creado con exito","¡Participante creado!");
              $location.path( "/participantes" );
            }
          },function(err){
            show.error(err.message,"¡Error!");
          });
      };
    };

    var ParticipantsDetailsCtrl = function ($scope, Session, ParticipantService, $routeParams, $location  ) {
      var id = $routeParams.id;
      $scope.participant = ParticipantService.participants.filter(function (el) {
        return (el.id === +id);
      })[0];
      $scope.participant.session_id = Session.id;

      $scope.addParticipant = function(form){
        if (!form.$valid) return;
        ParticipantService.update($scope.participant)
          .then(function (ok) {
            if (ok) {
              show.success("El participante se ha actualizado con exito","¡Participante actualizado!");
              $location.path( "/participantes" );
            }
          }, function (err) {
            show.error(err.message,"¡Error!");
          });
      }
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
