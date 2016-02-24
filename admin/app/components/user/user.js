'use strict';

angular.module('diaApp').service('UserService', new GenericService("user"));

angular.module('diaApp').config(
  new GenericController("UserService","Usuario","user","users",[USER_ROLES.SUPER_ADMIN])
);
