'use strict';

angular.module('diaApp').service('UserService', new GenericService("user"));

angular.module('diaApp').config(
  new UserController("UserService", "Usuario", "user", "users")
);
