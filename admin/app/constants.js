'use strict';
(function() {
var WS_URL = "http://104.236.201.101/";

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
    SUMMARY:WS_URL+"/summary",
    LOGIN: WS_URL+"/login",
    DASHBOARD: WS_URL+"/dashboard",
    REPORT: {
      EARNINGS: {
        SIMPLE: WS_URL+"report/projects/earnings/",
        OVERHEAD:   WS_URL+"report/projects/earnings/overhead/",
        TOTALBOTH: WS_URL+"report/projects/earnings/total-amount-overhead/"
      },
      PROJECTS: {
        SIMPLE: WS_URL+"/report/projects/",
        QUANTITY: WS_URL+"/report/projects/quantity/"
      },
      CONGRESS: WS_URL+"/report/congress/",
      PUBLICATION: WS_URL+"/report/publications/",
      ANNUAL: WS_URL+"/report/annual/"
    },
    GET: function(service){
      return WS_URL+service+"/get";
    },
    LIST: function(service){
      return WS_URL+service+"/list";
    },
    ADD: function(service){
      return WS_URL+service+"/add";
    },
    UPDATE: function(service){
      return WS_URL+service+"/update";
    },
    DELETE: function(service){
      return WS_URL+service+"/del";
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
    REPORT: "Reporte",
    UNIT: "Unidad",
    // Constant for details of Notifications
    NOTIFICATION_DELETE_SUCCESS : "se ha borrado con exito",
    NOTIFICATION_DELETE_NAME : "borrado/a",
    NOTIFICATION_CREATE_SUCCESS : "se ha creado con exito",
    NOTIFICATION_CREATE_NAME : "creado/a",
    NOTIFICATION_UPDATE_SUCCESS : "se ha actualizado con exito",
    NOTIFICATION_UPDATE_NAME : "actualizado/a",
    NOTIFICATION_REPORT_INFO_TITLE: " se ha generado",
    NOTIFICATION_REPORT_INFO: "Espere por favor, sino trate de nuevo.",
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
    PROJECT: {
      LIST: "/proyectos",
      CREATE: "/proyectos/crear",
      EDIT: "/proyectos/:id",
      SINGLE: "app/components/project/project.html",
      PLURAL: "app/components/project/projects.html"
    },
    DASHBOARD: {
      SINGLE: "app/components/dashboard/dashboard.html"
    },
    REPORT: {
      LIST: "/reportes",
      SINGLE: "app/components/report/reports.html"
    },
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
    ERROR404: {
      SINGLE: "/404.html"
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
})();
