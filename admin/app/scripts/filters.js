'use strict';

angular.module('diaAppFilters', []).filter('sino', function() {
  return function(input) {
    return input ? 'Si' : 'No';
  };
});
