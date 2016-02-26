'use strict';

angular.module('diaAppFilters', []).filter('sino', function() {
  return function(input) {
    return input ? 'Si' : 'No';
  };
})
  .filter('roles', function() {
    return function(input) {
      if (input=="REPORT") {
        return "Genera Reportes";
      } else if (input=="ADMIN") {
        return "Modifica Registros";
      } else if (input=="SUPER-ADMIN") {
        return "Maneja usuarios";
      }
    }
  });
