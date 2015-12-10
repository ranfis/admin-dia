'use strict';

var GenericService = GenericService || {};

angular.module('diaApp').service('InstitutionService', new GenericService("institution"));

angular.module('diaApp').config(function ($routeProvider, USER_ROLES, PATH, MESSAGES) {

  var InstitutionsListCtrl = function ($scope, Session, Alert, InstitutionService, $rootScope) {
    $rootScope.searchFilter = ""; // Reset the filter value when changing between routes
    InstitutionService.list(Session.id)
      .then(function (res) {
        $scope.institutions = res.data.result;
        InstitutionService.institutions = $scope.institutions;
      }, function(err){
        Alert.error(err.message,MESSAGES.ERROR_TEXT);
      });

    $scope.deleteInstitution = function(id,index){
      Alert.confirm(MESSAGES.DELETE_ELEMENT,MESSAGES.DELETE_QUESTION,MESSAGES.DELETE_CONFIRM,function(){
        InstitutionService.delete(id,Session.id)
          .then(function(msg){
            if(msg === "OK"){
              $scope.institutions.splice(index, 1);
              Alert.success(MESSAGES.INSTITUTION+" "+MESSAGES.NOTIFICATION_DELETE_SUCCESS,"¡"+MESSAGES.INSTITUTION+" "+MESSAGES.NOTIFICATION_DELETE_NAME+"!");
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

  var InstitutionsCreateCtrl = function ($scope, Session, Alert, InstitutionService,$location) {
    $scope.institution = {
      session_id: Session.id
    };
    $scope.addInstitution = function(form){
      if (!form.$valid){return;}
      InstitutionService.create($scope.institution)
        .then(function(msg){
          if(msg === "OK"){
            $scope.institution = {};
            Alert.success(MESSAGES.INSTITUTION+" "+MESSAGES.NOTIFICATION_CREATE_SUCCESS,"¡"+MESSAGES.INSTITUTION+" "+MESSAGES.NOTIFICATION_CREATE_NAME+"!");
            $location.path(PATH.INSTITUTION.LIST);
          }
          else{
            Alert.error(msg,MESSAGES.ERROR_TEXT);
          }
        },function(err){
          Alert.error(err.message,MESSAGES.ERROR_TEXT);
        });
    };
  };

  var InstitutionsDetailsCtrl = function ($scope, Session, Alert, InstitutionService, $routeParams, $location  ) {
    var id = $routeParams.id;
    $scope.institution = InstitutionService.institutions.filter(function (el) {
      return (el.id === +id);
    })[0];
    $scope.institution.session_id = Session.id;

    $scope.addInstitution = function(form){
      if (!form.$valid){return;}
      InstitutionService.update($scope.institution)
        .then(function(msg){
          if(msg === "OK"){
            Alert.success(MESSAGES.INSTITUTION+" "+MESSAGES.NOTIFICATION_UPDATE_SUCCESS,"¡"+MESSAGES.INSTITUTION+" "+MESSAGES.NOTIFICATION_UPDATE_NAME+"!");
            $location.path(PATH.INSTITUTION.LIST);
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
    .when(PATH.INSTITUTION.LIST, {
      templateUrl: PATH.INSTITUTION.PLURAL,
      controller: InstitutionsListCtrl,
      data: {
        authorizedRoles: [USER_ROLES.ADMIN]
      }
    })
    .when(PATH.INSTITUTION.CREATE, {
      templateUrl: PATH.INSTITUTION.SINGLE,
      controller: InstitutionsCreateCtrl,
      data: {
        authorizedRoles: [USER_ROLES.ADMIN]
      }
    })
    .when(PATH.INSTITUTION.EDIT, {
      templateUrl: PATH.INSTITUTION.SINGLE,
      controller: InstitutionsDetailsCtrl,
      data: {
        authorizedRoles: [USER_ROLES.ADMIN]
      }
    });
});
