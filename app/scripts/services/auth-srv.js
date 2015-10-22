angular.module('diaApp')
  .factory('AuthService', function ($http, Session) {
    var authService = {};
   
    authService.login = function (credentials) {
      requestConfig = {headers: {'Content-Type': "text/plain"}};
      return $http
        .post('http://104.236.201.101/login', credentials,requestConfig)
        .then(function (res) {
          var user = res.data.result;
          user.email = credentials.email;
          user.role = "admin";
          user.name = "Luis";
          user.lastname = "Martinez";
          user.photo = "none.png";
          Session.create(res.data.result.session_id, user.email ,user.role);
          return user;
        });
    };
   
    authService.isAuthenticated = function () {
      return !!Session.userId;
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