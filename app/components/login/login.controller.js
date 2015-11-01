'use strict';

angular.module('diaApp')
  .controller('LoginCtrl', function ($scope, $rootScope, AUTH_EVENTS, AuthService) {
    $scope.credentials = {};

    $scope.authenticate = function(credentials) {
      AuthService.login(credentials)
        .then(function (user) {
          $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
          $scope.setCurrentUser(user);
        },function () {
          $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      });
    };
  });
