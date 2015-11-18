'use strict';

angular.module('diaApp')
  .directive('rdWidget', function() {
    var directive = {
      transclude: true,
      template: '<div class="widget" ng-transclude></div>',
      restrict: 'EA'
    };
    return directive;
    // RR
    // function link(scope, element, attrs) {

    // }
  });

