"use strict";

var GenericController = function(serviceName, name, entity, listName, resolveDeps, afterFetchList, afterFetch, beforeSubmit) {
  var ENTITY = entity.toUpperCase();
  return function ($routeProvider, USER_ROLES, PATH, MESSAGES) {

    var ListCtrl = function ($scope, Session, Alert, Helper, $injector, $rootScope) {
      $rootScope.title = name;
      $rootScope.nav = name;
      $rootScope.searchFilter = ""; // Reset the filter value when changing between routes
      $scope.itemsPerPageTable = 10; // Value of items per page for table
      var service = $injector.get(serviceName);
      service.list(Session.id)
        .then(function (res) {
          $scope[listName] = res.data.result;
          service[listName] = $scope[listName];
          if(afterFetchList){
            afterFetchList($scope, Helper);
          }
        }, function (err) {
          Alert.error(err.message,MESSAGES.ERROR_TEXT);
        });

      $scope.delete = function (item) {
        Alert.confirm(MESSAGES.DELETE_ELEMENT,MESSAGES.DELETE_QUESTION,MESSAGES.DELETE_CONFIRM,function(){
          service.delete(item.id, Session.id)
            .then(function () {
              $scope[listName].splice($scope[listName].indexOf(item), 1);
              Alert.success(name+" "+MESSAGES.NOTIFICATION_DELETE_SUCCESS,"¡"+name+" "+MESSAGES.NOTIFICATION_DELETE_NAME+"!");
            }, function (err) {
              Alert.error(err.message,MESSAGES.ERROR_TEXT);
            });
        });
      };
    };
    ListCtrl.inject = [serviceName];

    var CreateCtrl = function ($scope,$rootScope, Session, Alert, Helper, $location, $injector) {
      $rootScope.title = name;
      $rootScope.nav = name+" / Nuevo";
      if(resolveDeps){
        resolveDeps.forEach(function(dep){
          var depService = $injector.get(dep.service);
          depService.list(Session.id)
            .then(function(res){
              $scope[dep.list] = res.data.result;
            });
        });
      }

      var service = $injector.get(serviceName);
      $scope[entity] = {
        session_id: Session.id
      };
      $scope.save = function (form) {
        if (!form.$valid){return;}
        if(beforeSubmit){
          beforeSubmit($scope, Helper);
        }
        service.create($scope[entity])
          .then(function () {
            $scope[entity] = {};
            Alert.success(name+" "+MESSAGES.NOTIFICATION_CREATE_SUCCESS,"¡"+name+" "+MESSAGES.NOTIFICATION_CREATE_NAME+"!");
            $location.path(PATH[ENTITY].LIST);
          }, function (err) {
            Alert.error(err.message,MESSAGES.ERROR_TEXT);
          });
      };
    };
    CreateCtrl.inject = [serviceName];

    var DetailsCtrl = function ($scope, $rootScope,Session, Alert, Helper, $routeParams, $location, $injector) {
      var id = $routeParams.id;
      $rootScope.title = name;
      $rootScope.nav = name+" / Editar / "+id;
      if(resolveDeps){
        resolveDeps.forEach(function(dep){
          var depService = $injector.get(dep.service);
          depService.list(Session.id)
            .then(function(res){
              $scope[dep.list] = res.data.result;
            });
        });
      }
      var service = $injector.get(serviceName);
      $scope[entity] = Helper.selectById(service[listName], id); // Getting the selected congress from memory
      $scope[entity].session_id = Session.id;

      if(afterFetch){
        afterFetch($scope,Helper);
      }

      $scope.save = function (form) {
        if (!form.$valid) {return;}
        if(beforeSubmit){
          beforeSubmit($scope, Helper);
        }
        service.update($scope[entity])
          .then(function () {
            Alert.success(name+" "+MESSAGES.NOTIFICATION_UPDATE_SUCCESS,"¡"+name+" "+MESSAGES.NOTIFICATION_UPDATE_NAME+"!");
            $location.path(PATH[ENTITY].LIST);
          }, function (err) {
            Alert.error(err.message,MESSAGES.ERROR_TEXT);
          });
      };
    };
    DetailsCtrl.inject = [serviceName];

    $routeProvider
      .when(PATH[ENTITY].LIST, {
        templateUrl: PATH[ENTITY].PLURAL,
        controller: ListCtrl,
        data: {
          authorizedRoles: [USER_ROLES.ADMIN]
        }
      })
      .when(PATH[ENTITY].CREATE, {
        templateUrl: PATH[ENTITY].SINGLE,
        controller: CreateCtrl,
        data: {
          authorizedRoles: [USER_ROLES.ADMIN]
        }
      })
      .when(PATH[ENTITY].EDIT, {
        templateUrl: PATH[ENTITY].SINGLE,
        controller: DetailsCtrl,
        data: {
          authorizedRoles: [USER_ROLES.ADMIN]
        }
      });
  };
};
GenericController.toString();
