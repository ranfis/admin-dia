'use strict';

var GenericService = GenericService || {};

angular.module('diaApp').service('ProjectService', new GenericService("project"));

angular.module('diaApp').config(function ($routeProvider, USER_ROLES, PATH, MESSAGES) {

  var ProjectsListCtrl = function ($scope, Session, Alert, ProjectService) {
    ProjectService.list(Session.id)
      .then(function (res) {
        console.log("res",res);
        $scope.projects = res.data.result;
        ProjectService.projects = $scope.projects;
      }, function(err){
        console.log("err",err);
        Alert.error(err.message,MESSAGES.ERROR_TEXT);
      });

    $scope.deleteProject = function(id,index){
      Alert.confirm(MESSAGES.DELETE_ELEMENT,MESSAGES.DELETE_QUESTION,MESSAGES.DELETE_CONFIRM,function(){
        ProjectService.delete(id,Session.id)
          .then(function(msg){
            if(msg === "OK"){
              $scope.projects.splice(index, 1);
              Alert.success(MESSAGES.PROJECT+" "+MESSAGES.NOTIFICATION_DELETE_SUCCESS,"¡"+MESSAGES.PROJECT+" "+MESSAGES.NOTIFICATION_DELETE_NAME+"!");
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

  var ProjectsCreateCtrl = function ($scope, Session, Alert, ProjectService,$location) {
    $scope.project = {
      session_id: Session.id
    };
    $scope.addProject = function(form){
      if (!form.$valid){return;}
      ProjectService.create($scope.project)
        .then(function(msg){
          if(msg === "OK"){
            $scope.project = {};
            Alert.success(MESSAGES.PROJECT+" "+MESSAGES.NOTIFICATION_CREATE_SUCCESS,"¡"+MESSAGES.PROJECT+" "+MESSAGES.NOTIFICATION_CREATE_NAME+"!");
            $location.path(PATH.PROJECT.LIST);
          }
          else{
            Alert.error(msg,MESSAGES.ERROR_TEXT);
          }
        },function(err){
          Alert.error(err.message,MESSAGES.ERROR_TEXT);
        });
    };
  };

  var ProjectsDetailsCtrl = function ($scope, Session, Alert, ProjectService, $routeParams, $location  ) {
    var id = $routeParams.id;
    $scope.project = ProjectService.projects.filter(function (el) {
      return (el.id === +id);
    })[0];
    $scope.project.session_id = Session.id;

    $scope.addProject = function(form){
      if (!form.$valid){return;}
      ProjectService.update($scope.project)
        .then(function(msg){
          if(msg === "OK"){
            Alert.success(MESSAGES.PROJECT+" "+MESSAGES.NOTIFICATION_UPDATE_SUCCESS,"¡"+MESSAGES.PROJECT+" "+MESSAGES.NOTIFICATION_UPDATE_NAME+"!");
            $location.path(PATH.PROJECT.LIST);
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
    .when(PATH.PROJECT.LIST, {
      templateUrl: 'app/components/project/projects.html',
      controller: ProjectsListCtrl,
      data: {
        authorizedRoles: [USER_ROLES.ADMIN]
      }
    })
    .when(PATH.PROJECT.CREATE, {
      templateUrl: 'app/components/project/project.html',
      controller: ProjectsCreateCtrl,
      data: {
        authorizedRoles: [USER_ROLES.ADMIN]
      }
    })
    .when(PATH.PROJECT.EDIT, {
      templateUrl: 'app/components/project/project.html',
      controller: ProjectsDetailsCtrl,
      data: {
        authorizedRoles: [USER_ROLES.ADMIN]
      }
    });
});
