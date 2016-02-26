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
    REPORT: 'REPORT',
    SUPER_ADMIN: 'SUPER-ADMIN'
  })
  .constant("WS", {
    SUMMARY: "/summary",
    LOGIN: "/login",
    DASHBOARD: "/dashboard",
    REPORT: {
      EARNINGS: {
        SIMPLE: "report/projects/earnings/",
        OVERHEAD: "report/projects/earnings/overhead/",
        TOTALBOTH: "report/projects/earnings/total-amount-overhead/"
      },
      PROJECTS: {
        SIMPLE: "/report/projects/",
        QUANTITY: "/report/projects/quantity/"
      },
      CONGRESS: "/report/congress/",
      PUBLICATION: "/report/publications/",
      ANNUAL: "/report/annual/"
    },
    GET: function (service) {
      return service + "/get";
    },
    LIST: function (service) {
      return service + "/list";
    },
    ADD: function (service) {
      return service + "/add";
    },
    UPDATE: function (service) {
      return service + "/update";
    },
    CUSTOM: function (name,service) {
      return service + name;
    },
    DELETE: function (service) {
      return service + "/del";
    },
  })
  .constant("REQUEST", {
    PLAIN: {headers: {'Content-Type': "text/plain"}}
  })
  .constant("MESSAGES", {
    // Constants for delete function of services
    DELETE_QUESTION: "¿Está seguro?",
    DELETE_ELEMENT: "Este registro se borrará.",
    DELETE_CONFIRM: "Si, borrar",
    // Constant for errors
    ERROR_TEXT: "¡Error!",
    DENY_PERMISSION: "Permisos denegados",
    // Constant of name of Entities for notification purpose
    SPONSOR: "Patrocinador",
    CONGRESS: "Congreso",
    FUND: "Fondo",
    JOURNAL: "Revista",
    PARTICIPANT: "Participante",
    PUBLICATION: "Participante",
    INSTITUTION: "Institución",
    REPORT: "Reporte",
    UNIT: "Unidad",
    USER: "Usuario",
    // Constant for details of Notifications
    NOTIFICATION_DELETE_SUCCESS: "se ha borrado con exito",
    NOTIFICATION_DELETE_NAME: "borrado/a",
    NOTIFICATION_CREATE_SUCCESS: "se ha creado con exito",
    NOTIFICATION_CREATE_NAME: "creado/a",
    NOTIFICATION_UPDATE_SUCCESS: "se ha actualizado con exito",
    NOTIFICATION_UPDATE_NAME: "actualizado/a",
    NOTIFICATION_REPORT_INFO_TITLE: " se ha generado",
    NOTIFICATION_REPORT_INFO: "Espere por favor, sino trate de nuevo.",
    // Messages for login and logout events
    LOGIN: "Se ha inicado sesión",
    LOGOUT: "Se ha cerrado la sesión del usuario",
    ERROR: {
      NO_INTERNET: "Ha ocurrido un error, revise su conexion a internet.",
      UNEXPECTED: "Ha ocurrido un error inesperado. Intente de nuevo mas tarde.",
      NOT_ALLOWED: "No tienes los permisos necesarios para acceder"
    },
    WARNINGS:{
      PASSWORD_TOO_SHORT:"La clave es muy corta",
      PASSWORD_TOO_SHORT_SUGESTION:"Utilize una clave de almenos 6 caracteres",
      PASSWORD_DOESNT_MATCH:"Las claves no coinciden."
    },
    OK: "OK"
  })
  .constant("CLASSES", {
    NONE: "none",
    INITIAL: "initial",
    NO_REPORT: "NO_REPORT",
    NO_USER: "NO_USER"
  })
  .constant("PATH", {
    ROOT: "/",
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
    ABOUT: {
      SINGLE: "app/components/about/about.html"
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
    USER: {
      LIST: "/usuarios",
      CREATE: "/usuarios/crear",
      EDIT: "/usuarios/:id",
      CHANGE_PASSWORD: "/usuarios/clave/:id",
      CHANGE_SELF_PASSWORD: "/cambiar-clave",
      SINGLE: "app/components/user/user.html",
      PLURAL: "app/components/user/users.html",
      PASS: "app/components/user/password.html"
    },
    LOGIN: "/login",
    LOGOUT: "/logout"
  });
