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
    DELETE_ELEMENT : "Este registro se borrará.",
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
    INSTITUTION: "Institución",
    UNIT: "Unidad",
    // Constant for details of Notifications
    NOTIFICATION_DELETE_SUCCESS : "se ha borrado con exito",
    NOTIFICATION_DELETE_NAME : "borrado/a",
    NOTIFICATION_CREATE_SUCCESS : "se ha creado con exito",
    NOTIFICATION_CREATE_NAME : "creado/a",
    NOTIFICATION_UPDATE_SUCCESS : "se ha actualizado con exito",
    NOTIFICATION_UPDATE_NAME : "actualizado/a",
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
      EDIT: "/patrocinadores/:id",
      SINGLE: "app/components/sponsor/sponsor.html",
      PLURAL: "app/components/sponsor/sponsors.html"
    },
    CONGRESS: {
      LIST: "/congresos",
      CREATE: "/congresos/crear",
      EDIT: "/congresos/:id",
      SINGLE: "app/components/congress/congress.html",
      PLURAL: "app/components/congress/congresses.html"
    },
    FUND: {
      LIST: "/fondos",
      CREATE: "/fondos/crear",
      EDIT: "/fondos/:id",
      SINGLE: "app/components/fund/fund.html",
      PLURAL: "app/components/fund/funds.html"
    },
    JOURNAL: {
      LIST: "/revistas",
      CREATE: "/revistas/crear",
      EDIT: "/revistas/:id",
      SINGLE: "app/components/journal/journal.html",
      PLURAL: "app/components/journal/journals.html"
    },
    PARTICIPANT: {
      LIST: "/participantes",
      CREATE: "/participantes/crear",
      EDIT: "/participantes/:id",
      SINGLE: "app/components/participant/participant.html",
      PLURAL: "app/components/participant/participants.html"
    },
    PUBLICATION: {
      LIST: "/publicaciones",
      CREATE: "/publicaciones/crear",
      EDIT: "/publicaciones/:id",
      SINGLE: "app/components/publication/publication.html",
      PLURAL: "app/components/publication/publications.html"
    },
    INSTITUTION: {
      LIST: "/instituciones",
      CREATE: "/instituciones/crear",
      EDIT: "/instituciones/:id",
      SINGLE: "app/components/institution/institution.html",
      PLURAL: "app/components/institution/institutions.html"
    },
    UNIT: {
      LIST: "/unidades",
      CREATE: "/unidades/crear",
      EDIT: "/unidades/:id",
      SINGLE: "app/components/unit/unit.html",
      PLURAL: "app/components/unit/units.html"
    },
    LOGIN: "/login",
    LOGOUT: "/logout"
  });

