'use strict';

angular.module('diaApp')
  .directive('uiInput', function() {
    return {
      restrict: 'E',
      scope: {
        uName: '@',
        ngModel: '=',
        ngForm: '='
      },
      templateUrl: 'app/shared/directives/input.html'
    };
  });
