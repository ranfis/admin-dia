'use strict';

angular.module('diaApp')
  .service('Session', function () {
    this.create = function (user) {
      //console.log("Session create",user);
      this.id = user.sessionId;
      this.userEmail = user.email;
      this.userRole = user.role.id;
    };
    this.destroy = function () {
      this.id = null;
      this.userId = null;
      this.userRole = null;
    };
  });
