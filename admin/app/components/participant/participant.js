'use strict';

var GenericService = GenericService || {};

angular.module('diaApp').service('ParticipantService', new GenericService("participant"));

angular.module('diaApp').config(function ($routeProvider, USER_ROLES, PATH, MESSAGES) {

    var ParticipantsListCtrl = function ($scope, Session, Alert, ParticipantService) {
      ParticipantService.list(Session.id)
        .then(function (res) {
          $scope.participants = res.data.result;
          ParticipantService.participants = $scope.participants;
        }, function(err){
          Alert.error(err.message,MESSAGES.ERROR_TEXT);
        });

      $scope.deleteParticipant = function(id,index){
        Alert.confirm(MESSAGES.DELETE_ELEMENT,MESSAGES.DELETE_QUESTION,MESSAGES.DELETE_CONFIRM,function(){
          ParticipantService.delete(id,Session.id)
            .then(function(msg){
              if(msg === "OK"){
                $scope.participants.splice(index, 1);
                Alert.success(MESSAGES.PARTICIPANT+" "+MESSAGES.NOTIFICATION_DELETE_SUCCESS,"¡"+MESSAGES.PARTICIPANT+" "+MESSAGES.NOTIFICATION_DELETE_NAME+"!");
              }
              else{
                Alert.error(msg,MESSAGES.ERROR_TEXT);
              }
            }, function (err) {
              Alert.error(err.message,MESSAGES.ERROR_TEXT);
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
              Alert.success(MESSAGES.PARTICIPANT+" "+MESSAGES.NOTIFICATION_CREATE_SUCCESS,"¡"+MESSAGES.PARTICIPANT+" "+MESSAGES.NOTIFICATION_CREATE_NAME+"!");
              $location.path(PATH.PARTICIPANT.LIST);
            }
            else{
              Alert.error(msg,MESSAGES.ERROR_TEXT);
            }
          },function(err){
            Alert.error(err.message,MESSAGES.ERROR_TEXT);
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
              Alert.success(MESSAGES.PARTICIPANT+" "+MESSAGES.NOTIFICATION_UPDATE_SUCCESS,"¡"+MESSAGES.PARTICIPANT+" "+MESSAGES.NOTIFICATION_UPDATE_NAME+"!");
              $location.path(PATH.PARTICIPANT.LIST);
            }
            else{
              Alert.error(msg,MESSAGES.ERROR_TEXT);
            }
          }, function (err) {
            Alert.error(err.message,MESSAGES.ERROR_TEXT);
          });
      };
    };

    $routeProvider
      .when(PATH.PARTICIPANT.LIST, {
        templateUrl: 'app/components/participant/participants.html',
        controller: ParticipantsListCtrl,
        data: {
          authorizedRoles: [USER_ROLES.ADMIN]
        }
      })
      .when(PATH.PARTICIPANT.CREATE, {
        templateUrl: 'app/components/participant/participant.html',
        controller: ParticipantsCreateCtrl,
        data: {
          authorizedRoles: [USER_ROLES.ADMIN]
        }
      })
      .when(PATH.PARTICIPANT.EDIT, {
        templateUrl: 'app/components/participant/participant.html',
        controller: ParticipantsDetailsCtrl,
        data: {
          authorizedRoles: [USER_ROLES.ADMIN]
        }
      });
  });
