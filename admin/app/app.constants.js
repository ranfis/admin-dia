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
  .constant("WS","http://104.236.201.101") // http://localhost/ws-dia
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
    NOTIFICATION_UPDATE_NAME : "acualizado/a"
  })
  .constant("PATH",{
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
    }
  });

