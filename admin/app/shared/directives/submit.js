'use strict';

angular.module('diaApp')
  .directive('uiSubmit', function() {
    var directive = {
      transclude: true,
      templateUrl: 'app/shared/submit/submit.html',
      restrict: 'EA'
    };
    return directive;
  });

