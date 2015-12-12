'use strict';

angular.module('diaApp')
  .directive('uiSubmitWithout', function() {
    var directive = {
      transclude: true,
      templateUrl: 'app/shared/submit/submitnotback.html',
      restrict: 'EA'
    };
    return directive;
  });

