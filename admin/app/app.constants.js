'use strict';

angular.module('diaApp')
  .constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
  })
  .constant('USER_ROLES', {
    ALL: '*',
    ADMIN: 'ADMIN',
    EDITOR: 'EDITOR'
  })
  .constant("WS",{
    URL:"http://104.236.201.101", // http://localhost/ws-dia
    SUMMARY:"http://104.236.201.101/summary",
    LOGIN: "http://104.236.201.101/login",
    LIST: function(service){
      return "http://104.236.201.101/"+service+"/list";
    },
    ADD: function(service){
      return "http://104.236.201.101/"+service+"/add";
    },
    UPDATE: function(service){
      return "http://104.236.201.101/"+service+"/update";
    },
    DELETE: function(service){
      return "http://104.236.201.101/"+service+"/del";
    },
  })
  .constant("REQUEST",{
    PLAIN: {headers: {'Content-Type': "text/plain"}}
  })
  .constant("MESSAGES",{
    // Constants for delete function of services
    DELETE_QUESTION : "¿Está seguro?",
    DELETE_ELEMENT : "Dicho elemento se borrará",
    DELETE_CONFIRM : "Si, borrar",
    // Constant for errors
    ERROR_TEXT : "¡Error!",
    // Constant of name of Entities for notification purpose
    SPONSOR : "Patrocinador",
    CONGRESS : "Congreso",
    FUND: "Fondo",
    JOURNAL: "Revista",
    PARTICIPANT: "Participante",
    PUBLICATION: "Participante",
    // Constant for details of Notifications
    NOTIFICATION_DELETE_SUCCESS : "se ha borrado con exito",
    NOTIFICATION_DELETE_NAME : "borrado/a",
    NOTIFICATION_CREATE_SUCCESS : "se ha creado con exito",
    NOTIFICATION_CREATE_NAME : "creado/a",
    NOTIFICATION_UPDATE_SUCCESS : "se ha actualizado con exito",
    NOTIFICATION_UPDATE_NAME : "acualizado/a",
    // Messages for login and logout events
    LOGIN: "Se ha inicado sesión",
    LOGOUT: "Se ha cerrado la sesión del usuario",
    ERROR: {
      NO_INTERNET: "Ha ocurrido un error, revise su conexion a internet."
    },
    OK:"OK"
  })
  .constant("PATH",{
    ROOT:"/",
    SPONSOR: {
      LIST: "/patrocinadores",
      CREATE: "/patrocinadores/crear",
      EDIT: "/patrocinadores/:id"
    },
    CONGRESS: {
      LIST: "/congresos",
      CREATE: "/congresos/crear",
      EDIT: "/congresos/:id"
    },
    FUND: {
      LIST: "/fondos",
      CREATE: "/fondos/crear",
      EDIT: "/fondos/:id"
    },
    JOURNAL: {
      LIST: "/revistas",
      CREATE: "/revistas/crear",
      EDIT: "/revistas/:id"
    },
    PARTICIPANT: {
      LIST: "/participantes",
      CREATE: "/participantes/crear",
      EDIT: "/participantes/:id"
    },
    PUBLICATION: {
      LIST: "/publicaciones",
      CREATE: "/publicaciones/crear",
      EDIT: "/publicaciones/:id"
    },
    LOGIN: "/login",
    LOGOUT: "/logout"
  });

