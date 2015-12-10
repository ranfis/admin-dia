"use strict";

var GenericController = function(serviceName, name, entity, listName,resolveDeps) {
  var ENTITY = entity.toUpperCase();
  return function ($routeProvider, USER_ROLES, PATH, MESSAGES) {

    var ListCtrl = function ($scope, Session, Alert, $injector, $rootScope) {
      $rootScope.searchFilter = ""; // Reset the filter value when changing between routes
      var service = $injector.get(serviceName);
      service.list(Session.id)
        .then(function (res) {
          $scope[listName] = res.data.result;
          service[listName] = $scope[listName];
        }, function (err) {
          Alert.error(err.message,MESSAGES.ERROR_TEXT);
        });

      $scope.delete = function (id, index) {
        Alert.confirm(MESSAGES.DELETE_ELEMENT,MESSAGES.DELETE_QUESTION,MESSAGES.DELETE_CONFIRM,function(){
          service.delete(id, Session.id)
            .then(function () {
              $scope[listName].splice(index, 1);
              Alert.success(name+" "+MESSAGES.NOTIFICATION_DELETE_SUCCESS,"¡"+name+" "+MESSAGES.NOTIFICATION_DELETE_NAME+"!");
            }, function (err) {
              Alert.error(err.message,MESSAGES.ERROR_TEXT);
            });
        });
      };
    };
    ListCtrl.inject = [serviceName];

    var CreateCtrl = function ($scope, Session, Alert, $location, $injector) {
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

    var DetailsCtrl = function ($scope, Session, Alert, $routeParams, $location, $injector) {
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
      var id = $routeParams.id;
      $scope[entity] = service[listName].filter(function (el) {
        return (el.id === +id);
      })[0];
      $scope[entity].session_id = Session.id;

      $scope.save = function (form) {
        if (!form.$valid) {
          return;
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
    CreateCtrl.inject = [serviceName];

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
