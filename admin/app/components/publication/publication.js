'use strict';

var GenericService = GenericService || {};

angular.module('diaApp').service('PublicationService', new GenericService("publication"));

angular.module('diaApp').config(function ($routeProvider, USER_ROLES, PATH, MESSAGES) {

  var PublicationsListCtrl = function ($scope, Session,Alert, PublicationService) {
    PublicationService.list(Session.id)
      .then(function (res) {
        $scope.publications = res.data.result;
        PublicationService.publications = $scope.publications;
      }, function(err){
        Alert.error(err.message,MESSAGES.ERROR_TEXT);
      });

    $scope.deletePublication = function(id,index){
      Alert.confirm(MESSAGES.DELETE_ELEMENT,MESSAGES.DELETE_QUESTION,MESSAGES.DELETE_CONFIRM,function(){
        PublicationService.delete(id,Session.id)
          .then(function(msg){
            if(msg === "OK"){
              $scope.publications.splice(index, 1);
              Alert.success(MESSAGES.PUBLICATION+" "+MESSAGES.NOTIFICATION_DELETE_SUCCESS,"¡"+MESSAGES.PUBLICATION+" "+MESSAGES.NOTIFICATION_DELETE_NAME+"!");
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

  var PublicationsCreateCtrl = function ($scope, Session, Alert, journals, participants, PublicationService,$location) {
    $scope.journals = journals.data.result;
    $scope.participants = participants.data.result;
    $scope.publication = {
      session_id: Session.id,
      has_intellectual_prop : false
  };
    $scope.addPublication = function(form){
      if (!form.$valid){return;}
      PublicationService.create($scope.publication)
        .then(function(msg){
          if(msg === "OK"){
            $scope.publication = {};
            Alert.success(MESSAGES.PUBLICATION+" "+MESSAGES.NOTIFICATION_CREATE_SUCCESS,"¡"+MESSAGES.PUBLICATION+" "+MESSAGES.NOTIFICATION_CREATE_NAME+"!");
            $location.path(PATH.PUBLICATION.LIST);
          }
          else{
            Alert.error(msg,MESSAGES.ERROR_TEXT);

          }
        },function(err){
          Alert.error(err.message,MESSAGES.ERROR_TEXT);
        });
    };
  };

  var PublicationsDetailsCtrl = function ($scope, Session, Alert, Helper, journals, participants, PublicationService, $routeParams, $location  ) {
    $scope.journals = journals.data.result; // Needed to fill journals select box
    $scope.participants = participants.data.result; // Needed to fill participants select box
    $scope.publication = Helper.selectById(PublicationService.publications, $routeParams.id); // Getting the selected publication from memory
    $scope.publication.session_id = Session.id;
    $scope.publication.participantes = Helper.getIDs($scope.publication.participantes); // Retrieve the actual select value
    $scope.publication.journal = $scope.publication.journal.id; // Retrieve the actual select value
    $scope.addPublication = function(form){
      if (!form.$valid){return;}
      PublicationService.update($scope.publication)
        .then(function (msg) {
          if (msg === "OK") {
            Alert.success(MESSAGES.PUBLICATION+" "+MESSAGES.NOTIFICATION_UPDATE_SUCCESS,"¡"+MESSAGES.PUBLICATION+" "+MESSAGES.NOTIFICATION_UPDATE_NAME+"!");
            $location.path(PATH.PUBLICATION.LIST);
          }
          else{
            Alert.error(msg,MESSAGES.ERROR_TEXT);
          }
        }, function (err) {
          Alert.error(err.message,MESSAGES.ERROR_TEXT);
        });
    };
  };

  PublicationsCreateCtrl.resolve = {
    journals: function(JournalService, Session){
      return JournalService.list(Session.id);
    },
    participants: function(ParticipantService, Session){
      return ParticipantService.list(Session.id);
    }
  };

  $routeProvider
    .when(PATH.PUBLICATION.LIST, {
      templateUrl: PATH.PUBLICATION.PLURAL,
      controller: PublicationsListCtrl,
      data: {
        authorizedRoles: [USER_ROLES.ADMIN]
      }
    })
    .when(PATH.PUBLICATION.CREATE, {
      templateUrl: PATH.PUBLICATION.SINGLE,
      controller: PublicationsCreateCtrl,
      resolve: PublicationsCreateCtrl.resolve,
      data: {
        authorizedRoles: [USER_ROLES.ADMIN]
      }
    })
    .when(PATH.PUBLICATION.EDIT, {
      templateUrl: PATH.PUBLICATION.SINGLE,
      controller: PublicationsDetailsCtrl,
      resolve: PublicationsCreateCtrl.resolve,
      data: {
        authorizedRoles: [USER_ROLES.ADMIN]
      }
    });
});
