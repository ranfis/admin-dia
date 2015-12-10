'use strict';

var GenericService = GenericService || {};

angular.module('diaApp').service('ProjectService', new GenericService("project"));

angular.module('diaApp').config(function ($routeProvider, USER_ROLES, PATH, MESSAGES) {

  var ProjectsListCtrl = function ($scope, Session,Alert, ProjectService, $rootScope) {
    $rootScope.searchFilter = ""; // Reset the filter value when changing between routes
    ProjectService.list(Session.id)
      .then(function (res) {
        $scope.projects = res.data.result;
        ProjectService.projects = $scope.projects;
      }, function(err){
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

  var ProjectsCreateCtrl = function ($scope, Session, Alert, participants,funds, ProjectService,$location) {
    $scope.funds = funds.data.result;
    $scope.participants = participants.data.result;
    $scope.project = {
      session_id: Session.id,
      patent : false,
      software : true,
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

  var ProjectsDetailsCtrl = function ($scope, Session, Alert, Helper, participants, funds, ProjectService, $routeParams, $location  ) {
    $scope.funds = funds.data.result;
    $scope.participants = participants.data.result; // Needed to fill participants select box
    $scope.project = Helper.selectById(ProjectService.projects, $routeParams.id); // Getting the selected project from memory
    $scope.project.session_id = Session.id;
    $scope.project.researcher = $scope.project.researcher.id; // Retrieve the actual select value
    $scope.project.coresearcher = Helper.getIDs($scope.project.coresearcher); // Retrieve the actual select value
    $scope.project.fund = Helper.getIDs($scope.project.fund);
    //$scope.project.patrocinio = $scope.project.patrocinio.id; // Retrieve the actual select value
    $scope.addProject = function(form){
      if (!form.$valid){return;}
      ProjectService.update($scope.project)
        .then(function (msg) {
          if (msg === "OK") {
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

  ProjectsCreateCtrl.resolve = {
    participants: function(ParticipantService, Session){
      return ParticipantService.list(Session.id);
    },
    funds: function(FundService, Session) {
      return FundService.list(Session.id);
    }
  };

  $routeProvider
    .when(PATH.PROJECT.LIST, {
      templateUrl: PATH.PROJECT.PLURAL,
      controller: ProjectsListCtrl,
      data: {
        authorizedRoles: [USER_ROLES.ADMIN]
      }
    })
    .when(PATH.PROJECT.CREATE, {
      templateUrl: PATH.PROJECT.SINGLE,
      controller: ProjectsCreateCtrl,
      resolve: ProjectsCreateCtrl.resolve,
      data: {
        authorizedRoles: [USER_ROLES.ADMIN]
      }
    })
    .when(PATH.PROJECT.EDIT, {
      templateUrl: PATH.PROJECT.SINGLE,
      controller: ProjectsDetailsCtrl,
      resolve: ProjectsCreateCtrl.resolve,
      data: {
        authorizedRoles: [USER_ROLES.ADMIN]
      }
    });
});
