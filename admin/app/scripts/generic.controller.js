"use strict";

// config

/*
config = {
  serviceName: String, Required
  name: String, Required
  entity: String, Required
  listName: String, Required
  resolveDeps:function(){}, Optional
  afterFetchList:function(){}, Optional
  afterFetch:function(){}, Optional
  beforeSubmit:function(){} Optional
}
*/

var GenericController = function(config) {
  //assert(config.serviceName);
  //assert(config.name);
  //assert(config.config.entity);
  //assert(config.listName);

  console.log(config)


  var ENTITY = config.entity.toUpperCase();
  return function ($routeProvider, USER_ROLES, PATH, MESSAGES) {

    var ListCtrl = function ($scope, Session, Alert, Helper, $injector, $rootScope) {
      $rootScope.title = name;
      $rootScope.nav = name;
      $rootScope.searchFilter = ""; // Reset the filter value when changing between routes
      $scope.itemsPerPageTable = 10; // Value of items per page for table
      var service = $injector.get(config.serviceName);
      service.list(Session.id)
        .then(function (res) {
          $scope[config.listName] = res.data.result;
          service[config.listName] = $scope[config.listName];
          if(config.afterFetchList){
            config.afterFetchList($scope, Helper);
          }
        }, function (err) {
          Alert.error(err.message,MESSAGES.ERROR_TEXT);
        });

      $scope.delete = function (item) {
        Alert.confirm(MESSAGES.DELETE_ELEMENT,MESSAGES.DELETE_QUESTION,MESSAGES.DELETE_CONFIRM,function(){
          service.delete(item.id, Session.id)
            .then(function () {
              $scope[config.listName].splice($scope[config.listName].indexOf(item), 1);
              Alert.success(name+" "+MESSAGES.NOTIFICATION_DELETE_SUCCESS,"¡"+name+" "+MESSAGES.NOTIFICATION_DELETE_NAME+"!");
            }, function (err) {
              Alert.error(err.message,MESSAGES.ERROR_TEXT);
            });
        });
      };
    };
    ListCtrl.inject = [config.serviceName];

    var CreateCtrl = function ($scope,$rootScope, Session, Alert, Helper, $location, $injector) {
      $rootScope.title = name;
      $rootScope.nav = name+" / Nuevo";
      if(config.resolveDeps){
        config.resolveDeps.forEach(function(dep){
          var depService = $injector.get(dep.service);
          depService.list(Session.id)
            .then(function(res){
              $scope[dep.list] = res.data.result;
            });
        });
      }

      var service = $injector.get(config.serviceName);
      $scope[config.entity] = {
        session_id: Session.id
      };
      $scope.save = function (form) {
        if (!form.$valid){return;}
        if(config.beforeSubmit){
          config.beforeSubmit($scope, Helper);
        }
        service.create($scope[config.entity])
          .then(function () {
            $scope[config.entity] = {};
            Alert.success(name+" "+MESSAGES.NOTIFICATION_CREATE_SUCCESS,"¡"+name+" "+MESSAGES.NOTIFICATION_CREATE_NAME+"!");
            $location.path(PATH[ENTITY].LIST);
          }, function (err) {
            Alert.error(err.message,MESSAGES.ERROR_TEXT);
          });
      };
    };
    CreateCtrl.inject = [config.serviceName];

    var DetailsCtrl = function ($scope, $rootScope,Session, Alert, Helper, $routeParams, $location, $injector) {
      var id = $routeParams.id;
      $rootScope.title = name;
      $rootScope.nav = name+" / Editar / "+id;
      if(config.resolveDeps){
        config.resolveDeps.forEach(function(dep){
          var depService = $injector.get(dep.service);
          depService.list(Session.id)
            .then(function(res){
              $scope[dep.list] = res.data.result;
            });
        });
      }
      var service = $injector.get(config.serviceName);
      $scope[config.entity] = Helper.selectById(service[config.listName], id); // Getting the selected congress from memory
      $scope[config.entity].session_id = Session.id;

      if(config.afterFetch){
        config.afterFetch($scope,Helper);
      }

      $scope.save = function (form) {
        if (!form.$valid) {return;}
        if(config.beforeSubmit){
          config.beforeSubmit($scope, Helper);
        }
        service.update($scope[config.entity])
          .then(function () {
            Alert.success(name+" "+MESSAGES.NOTIFICATION_UPDATE_SUCCESS,"¡"+name+" "+MESSAGES.NOTIFICATION_UPDATE_NAME+"!");
            $location.path(PATH[ENTITY].LIST);
          }, function (err) {
            Alert.error(err.message,MESSAGES.ERROR_TEXT);
          });
      };
    };
    DetailsCtrl.inject = [config.serviceName];

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
      })
      .otherwise({
        templateUrl: PATH.ERROR404.SINGLE
      });
  };
};
GenericController.toString();
