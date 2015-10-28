'use strict';

angular.module('diaApp')
  .controller('LoginCtrl', function ($scope, $rootScope, AUTH_EVENTS, AuthService) {
    $scope.credentials = {
      email: "lmartinez@correo.com",
      pass: "12345678"
    };

    //$scope.isLoginPage = true;

    $scope.authenticate = function(credentials) {
      AuthService.login(credentials).then(function (user) {
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        $scope.setCurrentUser(user);
      }, function () {
        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      });
    };
  });
