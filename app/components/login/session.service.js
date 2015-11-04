'use strict';

angular.module('diaApp')
  .service('Session', function () {
    this.create = function (user) {
      this.id = user.sessionId;
      this.userEmail = user.email;
      this.userRole = user.role.name;
    };
    this.destroy = function () {
      this.id = null;
      this.email = null;
      this.userRole = null;
    };
  });
