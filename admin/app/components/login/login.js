'use strict';

angular.module('diaApp')
  .config(function ($routeProvider, PATH, MESSAGES) {
    var LoginCtrl = function ($scope, Alert, $rootScope, $location, AUTH_EVENTS, AuthService) {

      $scope.credentials = {};
      $scope.authenticate = function (form) {
        if (!form.$valid){return;}
        AuthService.login($scope.credentials)
          .then(function (user) {
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, user.name);
            $scope.setCurrentUser(user);
            $location.path(PATH.ROOT);
          }, function (err) {
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed,err);
          });
      };
      $scope.$on(AUTH_EVENTS.loginFailed, function(event, args) {
        Alert.error(args.message);
      });
      $scope.$on(AUTH_EVENTS.loginSuccess, function(event, args) {
        Alert.success(args,MESSAGES.LOGIN);
      });
    };
    var LogoutCtrl = function ($scope, Alert, $location, Session) {
      Session.destroy();
      $scope.currentUser = null;
      Alert.success(MESSAGES.LOGOUT);
      $location.url(PATH.LOGIN);
    };
      $routeProvider
        .when(PATH.LOGIN, {
          templateUrl: 'app/components/login/login.html',
          controller: LoginCtrl
        })
        .when(PATH.LOGOUT, {
          controller: LogoutCtrl,
          templateUrl: 'app/components/login/login.html'
        });
  });
