'use strict';

angular.module('diaAppFilters', []).filter('sino', function() {
  return function(input) {
    return input ? 'Si' : 'No';
  };
})
  .filter('roles', function() {
    return function(input) {
      if (input=="REPORT") {
        return "Reportes";
      } else if (input=="ADMIN") {
        return "Administrador";
      } else if (input=="SUPER-ADMIN") {
        return "Super-Administrador";
      }
    }
  });
