'use strict';

angular.module('diaApp')
  .factory('AuthService', function ($http, Session,WS_URLS) {
    var authService = {};

    var requestOptions = {headers: {'Content-Type': "text/plain"}};

    authService.login = function (credentials) {
      return $http
        .post(WS_URLS.login, credentials,requestOptions)
        .then(function (res) {
          return res.data.result;
        })
        .then(function(session){
          return authService.userSummary(session);
        })
        .then(function(user){
          Session.create(user);
          return user;
        });
    };

    authService.userSummary = function(session){
      return $http
        .get(WS_URLS.summary, {params:session})
        .then(function (res) {
          var user = res.data.result;
          user.sessionId = session.session_id;
          return user;
        });
    };

    authService.isAuthenticated = function () {

      return !!Session.userEmail;
    };

    authService.isAuthorized = function (authorizedRoles) {
      if (!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
      }
      return (authService.isAuthenticated() &&
        authorizedRoles.indexOf(Session.userRole) !== -1);
    };

    return authService;
  })
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push([
      '$injector',
      function ($injector) {
        return $injector.get('AuthInterceptor');
      }
    ]);
  })
  .factory('AuthInterceptor', function ($rootScope, $q,AUTH_EVENTS) {
    return {
      responseError: function (response) {
        $rootScope.$broadcast({
          401: AUTH_EVENTS.notAuthenticated,
          403: AUTH_EVENTS.notAuthorized,
          419: AUTH_EVENTS.sessionTimeout,
          440: AUTH_EVENTS.sessionTimeout
        }[response.status], response);
        return $q.reject(response);
      }
    };
  });
