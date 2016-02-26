'use strict';

angular.module('diaApp').service('UserService', new GenericService("user"));

angular.module('diaApp').config(
  new UserController("UserService", "Usuario", "user", "users",
    null,
    null,
    null,
    function ($scope) {
      if ($scope["user"].roles) {
        if ($scope["user"].roles.REPORT) {
          $scope["user"].rol = 1;
        }
        else if ($scope["user"].roles.ADMIN) {
          $scope["user"].rol = 2;
        }
        else if ($scope["user"].roles.SUPER_ADMIN) {
          $scope["user"].rol = 3;
        }
        else {
          $scope["user"].rol = 1;
        }
      }
    })
);
