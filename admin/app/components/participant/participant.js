'use strict';

var GenericService = GenericService || {};

angular.module('diaApp').service('ParticipantService', new GenericService("participant"));

angular.module('diaApp').config(function ($routeProvider) {

    var ParticipantsListCtrl = function ($scope, Session, Alert, ParticipantService) {
      ParticipantService.list(Session.id)
        .then(function (res) {
          $scope.participants = res.data.result;
          ParticipantService.participants = $scope.participants;
        }, function(err){
          Alert.error(err.message,"¡Error!");
        });

      $scope.deleteParticipant = function(id,index){
        Alert.confirm("Este participante se borrará","¿Está seguro?","Si, borrar",function(){
          ParticipantService.delete(id,Session.id)
            .then(function(msg){
              if(msg === "OK"){
                $scope.participants.splice(index, 1);
                Alert.success("El participante se ha borrado con exito","¡Participante borrado!");
              }
              else{
                Alert.error(msg,"¡Error!");
              }
            }, function (err) {
              Alert.error(err.message,"¡Error!");
            });
        });
      };
    };

    var ParticipantsCreateCtrl = function ($scope, Session, Alert, ParticipantService,$location) {
      $scope.participant = {
        session_id: Session.id
      };
      $scope.addParticipant = function(form){
        if (!form.$valid){return;}
        ParticipantService.create($scope.participant)
          .then(function(msg){
            if(msg === "OK"){
              $scope.participant = {};
              Alert.success("El participante se ha creado con exito","¡Participante creado!");
              $location.path( "/participantes" );
            }
            else{
              Alert.error(msg,"¡Error!");
            }
          },function(err){
            Alert.error(err.message,"¡Error!");
          });
      };
    };

    var ParticipantsDetailsCtrl = function ($scope, Session, Alert, ParticipantService, $routeParams, $location  ) {
      var id = $routeParams.id;
      $scope.participant = ParticipantService.participants.filter(function (el) {
        return (el.id === +id);
      })[0];
      $scope.participant.session_id = Session.id;

      $scope.addParticipant = function(form){
        if (!form.$valid){return;}
        ParticipantService.update($scope.participant)
          .then(function(msg){
            if(msg === "OK"){
              Alert.success("El participante se ha actualizado con exito","¡Participante actualizado!");
              $location.path( "/participantes" );
            }
            else{
              Alert.error(msg,"¡Error!");
            }
          }, function (err) {
            Alert.error(err.message,"¡Error!");
          });
      };
    };

    $routeProvider
      .when('/participantes', {
        templateUrl: 'app/components/participant/participants.html',
        controller: ParticipantsListCtrl,
        data: {
          authorizedRoles: ["ADMIN"]
        }
      })
      .when('/participantes/crear', {
        templateUrl: 'app/components/participant/participant.html',
        controller: ParticipantsCreateCtrl,
        data: {
          authorizedRoles: ["ADMIN"]
        }
      })
      .when('/participantes/:id', {
        templateUrl: 'app/components/participant/participant.html',
        controller: ParticipantsDetailsCtrl,
        data: {
          authorizedRoles: ["ADMIN"]
        }
      });
  });
