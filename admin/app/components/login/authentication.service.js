'use strict';

angular.module('diaApp').factory('AuthService', function ($http, Helper,Session,WS,ENV, REQUEST) {
    var authService = {};

    authService.login = function (credentials) {
      return $http
        .post(ENV.WS_URL+WS.LOGIN, credentials,REQUEST.PLAIN)
        .then(Helper.checkResult,Helper.handleErrors)
        .then(getUserSummary)
        .then(createSession);
    };

    var getUserSummary = function(res){
      var session = res.data.result;
      return $http
        .get(ENV.WS_URL+WS.SUMMARY, {params:session})
        .then(Helper.checkResult,Helper.handleErrors)
        .then(function (res) {
          var user = res.data.result;
          user.sessionId = session.session_id;
          return user;
        });
    };

    var createSession = function (user) {
      return Session.create(user);
    };

    authService.isAuthenticated = function () {
      return !!Session.userEmail;
    };

  authService.trySessionRestore = function(run){
    var user = Session.restore();
    if(user){
      run(user);
    }
  };
    authService.isAuthorized = function (authorizedRoles) {
      if(!authorizedRoles.indexOf("*")!==-1){
        return true;
      }
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
