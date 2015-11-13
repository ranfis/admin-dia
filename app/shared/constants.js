'use strict';

angular
  .module('diaApp')
  .constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})
  .constant('USER_ROLES', {
    all: '*',
    admin: 'admin',
    editor: 'editor'
  })
  .constant("WS","http://localhost/ws-dia")
  .constant("REQUEST",{
    PLAIN: {headers: {'Content-Type': "text/plain"}}
  })
