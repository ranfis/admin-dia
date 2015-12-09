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

  var PublicationsCreateCtrl = function ($scope, Session, Alert, PublicationService, ParticipantService, JournalService,$location) {
    JournalService.list(Session.id)
      .then(function(res){
        $scope.journals = res.data.result;
      });
    ParticipantService.list(Session.id)
      .then(function(res){
        $scope.participants = res.data.result;
      });

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

  var PublicationsDetailsCtrl = function ($scope, Session, Alert, Helper, PublicationService, ParticipantService, JournalService, $routeParams, $location  ) {
    JournalService.list(Session.id)
      .then(function(res){
        $scope.journals = res.data.result;
      });
    ParticipantService.list(Session.id)
      .then(function(res){
        $scope.participants = res.data.result;
      });

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
      data: {
        authorizedRoles: [USER_ROLES.ADMIN]
      }
    })
    .when(PATH.PUBLICATION.EDIT, {
      templateUrl: PATH.PUBLICATION.SINGLE,
      controller: PublicationsDetailsCtrl,
      data: {
        authorizedRoles: [USER_ROLES.ADMIN]
      }
    });
});
