'use strict';

angular.module('diaApp')
  .directive('uiInput', function() {
    return {
      restrict: 'E',
      scope: {
        uName: '@',
        uError: '@',
        ngModel: '='
      },
      link: function(scope){
        scope.uID = "input"+scope.uName;
        scope.uError = "Este campo es requerido.";
        $("form").validator();
      },
      templateUrl: 'app/shared/directives/input.html'
    };
  });
