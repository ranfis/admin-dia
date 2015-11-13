'use strict';

angular.module('diaApp')
  .config(function ($routeProvider) {

    var LoginCtrl = function ($scope, $rootScope, $location, AUTH_EVENTS, AuthService) {
      $scope.credentials = {};

      $scope.authenticate = function (form) {
        if (form.$valid) {
          AuthService.login($scope.credentials)
            .then(function (user) {
              $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, user.name);
              $scope.setCurrentUser(user);
              $location.path("/");
            }, function (err) {
              $rootScope.$broadcast(AUTH_EVENTS.loginFailed,err.message);
            });
        }
      };

      $scope.$on(AUTH_EVENTS.loginFailed, function(event, args) {
        show.error(args,"No se pudo iniciar sesion");
      });

      $scope.$on(AUTH_EVENTS.loginSuccess, function(event, args) {
        show.success("Bienvenido "+args,"Login exitoso");
      });
    };

    $routeProvider
      .when('/login', {
        templateUrl: 'components/login/login.html',
        controller: LoginCtrl
      });
  });
