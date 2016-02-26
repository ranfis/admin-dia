"use strict";

var UserController = function(serviceName, name, entity, listName, resolveDeps, afterFetchList, afterFetch, beforeSubmit) {
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
        service.custom("post","/update","user",{session_id:$scope[entity].session_id,id:$scope[entity].id,nombre_completo:$scope[entity].nombre_completo,rol:$scope[entity].rol.id})
          .then(function () {
            Alert.success(name+" "+MESSAGES.NOTIFICATION_UPDATE_SUCCESS,"¡"+name+" "+MESSAGES.NOTIFICATION_UPDATE_NAME+"!");
            $location.path(PATH[ENTITY].LIST);
          }, function (err) {
            Alert.error(err.message,MESSAGES.ERROR_TEXT);
          });
      };
    };
    DetailsCtrl.inject = [serviceName];


    var ProfileCtrl = function ($scope, $rootScope,Session, Alert, Helper, $routeParams, $location, $injector) {
      $scope.user = {
        id:Session._id,
        session_id: Session.id,
        nombre_completo: Session.name
      };
      $rootScope.title = name;
      $rootScope.nav = name+" / Perfil / "+$scope.user.id;

      var service = $injector.get(serviceName);

      $scope.save = function (form) {
        if (!form.$valid) {return;}
        service.custom("post","/update_info","profile",$scope.user)
          .then(function () {
            Alert.success(name+" "+MESSAGES.NOTIFICATION_UPDATE_SUCCESS,"¡"+name+" "+MESSAGES.NOTIFICATION_UPDATE_NAME+"!");
            $location.path("/");
          }, function (err) {
            Alert.error(err.message,MESSAGES.ERROR_TEXT);
          });
      };
    };
    ProfileCtrl.inject = [serviceName];


    var ProfileChangePassCtrl = function ($scope, $rootScope,Session, Alert, Helper, $routeParams, $location, $injector) {
      $scope.user = {
        id:Session._id,
        session_id: Session.id,
      };
      $rootScope.title = name;
      $rootScope.nav = name+" / Perfil / "+$scope.user.id;

      var service = $injector.get(serviceName);

      $scope.save = function (form) {
        if (!form.$valid) {return;}
        if(!$scope[entity].clave || $scope[entity].clave.length < 6){
          Alert.warn(MESSAGES.WARNINGS.PASSWORD_TOO_SHORT_SUGESTION, MESSAGES.WARNINGS.PASSWORD_TOO_SHORT);
        }
        else if($scope[entity].clave != $scope[entity].clave2){
          Alert.warn(MESSAGES.WARNINGS.PASSWORD_DOESNT_MATCH);
        }
        else{
          service.custom("post","/change_password","profile",$scope.user)
            .then(function () {
              Alert.success(name+" "+MESSAGES.NOTIFICATION_UPDATE_SUCCESS,"¡"+name+" "+MESSAGES.NOTIFICATION_UPDATE_NAME+"!");
              $location.path("/");
            }, function (err) {
              Alert.error(err.message,MESSAGES.ERROR_TEXT);
            });
        }

      };
    };
    ProfileChangePassCtrl.inject = [serviceName];

    var ChangePasswordCtrl = function ($scope, $rootScope,Session, Alert, Helper, $routeParams, $location, $injector) {
      var id;
      if($routeParams.id) {
        id = $routeParams.id;
      }
      console.log(id);

      $rootScope.title = name;
      $rootScope.nav = name+" / Editar Clave / "+id;
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

        if(!$scope[entity].clave || $scope[entity].clave.length < 6){
          Alert.warn(MESSAGES.WARNINGS.PASSWORD_TOO_SHORT_SUGESTION, MESSAGES.WARNINGS.PASSWORD_TOO_SHORT);
        }
        else if($scope[entity].clave != $scope[entity].clave2){
          Alert.warn(MESSAGES.WARNINGS.PASSWORD_DOESNT_MATCH);
        }
        else{
          service.custom("post","/change_password","user",{id:$scope[entity].id,clave:$scope[entity].clave,session_id:$scope[entity].session_id})
           .then(function () {
           Alert.success(name+" "+MESSAGES.NOTIFICATION_UPDATE_SUCCESS,"¡"+name+" "+MESSAGES.NOTIFICATION_UPDATE_NAME+"!");
           $location.path(PATH[ENTITY].LIST);
           }, function (err) {
           Alert.error(err.message,MESSAGES.ERROR_TEXT);
           });
        }
      };
    };
    ChangePasswordCtrl.inject = [serviceName];

    $routeProvider
      .when(PATH[ENTITY].LIST, {
        templateUrl: PATH[ENTITY].PLURAL,
        controller: ListCtrl,
        data: {
          authorizedRoles: [USER_ROLES.SUPER_ADMIN]
        }
      })
      .when(PATH[ENTITY].CREATE, {
        templateUrl: PATH[ENTITY].SINGLE,
        controller: CreateCtrl,
        data: {
          authorizedRoles: [USER_ROLES.SUPER_ADMIN]
        }
      })
      .when(PATH[ENTITY].EDIT, {
        templateUrl: PATH[ENTITY].DETAIL,
        controller: DetailsCtrl,
        data: {
          authorizedRoles: [USER_ROLES.SUPER_ADMIN]
        }
      })
      .when(PATH[ENTITY].PROFILE, {
        templateUrl: PATH[ENTITY].PROFILE_FORM,
        controller: ProfileCtrl,
        data: {
          authorizedRoles: [USER_ROLES.ALL]
        }
      })
      .when(PATH[ENTITY].PROFILE_PASS, {
        templateUrl: PATH[ENTITY].PROFILE_PASS_FORM,
        controller: ProfileChangePassCtrl,
        data: {
          authorizedRoles: [USER_ROLES.ALL]
        }
      })
      .when(PATH[ENTITY].CHANGE_PASSWORD, {
        templateUrl: PATH[ENTITY].PASS,
        controller: ChangePasswordCtrl,
        data: {
          authorizedRoles: [USER_ROLES.SUPER_ADMIN]
        }
      })
      .otherwise({
        templateUrl: PATH.ERROR404.SINGLE
      });
  };
};
UserController.toString();
