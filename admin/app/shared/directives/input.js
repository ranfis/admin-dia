'use strict';

angular.module('diaApp')
  .directive('uiInput', function() {
    return {
      restrict: 'E',
      scope: {
        uName: '@',
        uDesc: '@',
        uType: '@',
        uMin: '@',
        uMax: '@',
        uError: '@',
        ngModel: '='
      },
      link: function(scope){
        scope.uID = "input"+scope.uName;
        scope.uError = "Este campo es requerido.";
        scope.uDesc = scope.uDesc || scope.uName;
        $("form").validator();
      },
      templateUrl: 'app/shared/directives/input.html'
    };
  })
  .directive('uiChosen', function() {
    return {
      restrict: 'E',
      scope: {
        uName: '@',
        uDesc: '@',
        uError: '@',
        uMulti:'@',
        uList: '=',
        uListLabel: '@',
        ngModel: '='
      },
      link: function(scope){
        scope.uID = "input"+scope.uName;
        scope.uError = "Este campo es requerido.";
        scope.uDesc = scope.uDesc || scope.uName;
        $("form").validator();
      },
      templateUrl: 'app/shared/directives/chosen.html'
    };
  });
