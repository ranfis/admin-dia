'use strict';

angular.module('diaApp').config(function ($routeProvider) {
    var LoginCtrl = function ($scope, Alert, $rootScope, $location, AUTH_EVENTS, AuthService) {
      $scope.credentials = {};

      $scope.authenticate = function (form) {
        if (!form.$valid){return;}
        AuthService.login($scope.credentials)
          .then(function (user) {
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, user.name);
            $scope.setCurrentUser(user);
            $location.path("/");
          }, function (err) {
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed,err);
          });
      };

      $scope.$on(AUTH_EVENTS.loginFailed, function(event, args) {
        console.error(args);
        Alert.error(args);
      });

      $scope.$on(AUTH_EVENTS.loginSuccess, function(event, args) {
        Alert.success("Bienvenido "+args,"Login exitoso");
      });
    };

  var LogoutCtrl = function ($scope, Alert, $rootScope, $location, AUTH_EVENTS, AuthService, Session) {
    console.info("aaaaaaaaaaaaaaaaaaaa");
    Session.destroy();
    $scope.currentUser = null;
    sessionStorage.diaUser = null;
    Alert.success("Adios");
  };

    $routeProvider
      .when('/login', {
        templateUrl: 'app/components/login/login.html',
        controller: LoginCtrl
      })
      .when('/logout', {
        controller: LogoutCtrl
      });
  });
