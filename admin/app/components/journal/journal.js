'use strict';

var GenericService = GenericService || {};

angular.module('diaApp').service('JournalService', new GenericService("journal"));

angular.module('diaApp').config(function ($routeProvider, USER_ROLES, PATH, MESSAGES) {

    var JournalsListCtrl = function ($scope, Session, Alert, JournalService) {
      JournalService.list(Session.id)
        .then(function (res) {
          $scope.journals = res.data.result;
          JournalService.journals = $scope.journals;
        }, function(err){
          Alert.error(err.message,MESSAGES.ERROR_TEXT);
        });

      $scope.deleteJournal = function(id,index){
        Alert.confirm(MESSAGES.DELETE_ELEMENT,MESSAGES.DELETE_QUESTION,MESSAGES.DELETE_CONFIRM,function(){
          JournalService.delete(id,Session.id)
            .then(function(msg){
              if(msg === "OK"){
                $scope.journals.splice(index, 1);
                Alert.success(MESSAGES.JOURNAL+" "+MESSAGES.NOTIFICATION_DELETE_SUCCESS,"¡"+MESSAGES.JOURNAL+" "+MESSAGES.NOTIFICATION_DELETE_NAME+"!");
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

    var JournalsCreateCtrl = function ($scope, Session, Alert, JournalService,$location) {
      $scope.journal = {
        session_id: Session.id
      };
      $scope.addJournal = function(form){
        if (!form.$valid){return;}
        JournalService.create($scope.journal)
          .then(function(msg){
            if(msg === "OK"){
              $scope.journal = {};
              Alert.success(MESSAGES.JOURNAL+" "+MESSAGES.NOTIFICATION_CREATE_SUCCESS,"¡"+MESSAGES.JOURNAL+" "+MESSAGES.NOTIFICATION_CREATE_NAME+"!");
              $location.path(PATH.JOURNAL.LIST);
            }
            else{
              Alert.error(msg,MESSAGES.ERROR_TEXT);
            }
          },function(err){
            Alert.error(err.message,MESSAGES.ERROR_TEXT);
          });
      };
    };

    var JournalsDetailsCtrl = function ($scope, Session, Alert, JournalService, $routeParams, $location  ) {
      var id = $routeParams.id;
      $scope.journal = JournalService.journals.filter(function (el) {
        return (el.id === +id);
      })[0];
      $scope.journal.session_id = Session.id;

      $scope.addJournal = function(form){
        if (!form.$valid){return;}
        JournalService.update($scope.journal)
          .then(function(msg){
            if(msg === "OK"){
              Alert.success(MESSAGES.JOURNAL+" "+MESSAGES.NOTIFICATION_UPDATE_SUCCESS,"¡"+MESSAGES.JOURNAL+" "+MESSAGES.NOTIFICATION_UPDATE_NAME+"!");
              $location.path(PATH.JOURNAL.LIST);
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
      .when(PATH.JOURNAL.LIST, {
        templateUrl: 'app/components/journal/journals.html',
        controller: JournalsListCtrl,
        data: {
          authorizedRoles: [USER_ROLES.ADMIN]
        }
      })
      .when(PATH.JOURNAL.CREATE, {
        templateUrl: 'app/components/journal/journal.html',
        controller: JournalsCreateCtrl,
        data: {
          authorizedRoles: [USER_ROLES.ADMIN]
        }
      })
      .when(PATH.JOURNAL.EDIT, {
        templateUrl: 'app/components/journal/journal.html',
        controller: JournalsDetailsCtrl,
        data: {
          authorizedRoles: [USER_ROLES.ADMIN]
        }
      });
  });
