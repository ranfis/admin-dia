'use strict';

angular.module('diaApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'components/login/login.html',
        controller: function ($scope, $rootScope, $location, AUTH_EVENTS, AuthService) {
          $scope.credentials = {};

          $scope.authenticate = function (credentials) {
            AuthService.login(credentials)
              .then(function (user) {
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                $scope.setCurrentUser(user);
                $location.path( "/" );
              }, function () {
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
              });
          };
        }
      });
  });
