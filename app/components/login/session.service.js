'use strict';

angular.module('diaApp')
  .service('Session', function () {
    this.create = function (user) {
      this.id = user.sessionId;
      this.userEmail = user.email;
      this.userRole = user.role.name;
      this.name = user.nombre_completo;
      return this;
    };
    this.destroy = function () {
      this.id = null;
      this.userEmail = null;
      this.userRole = null;
      this.name = null;
    };
  });
