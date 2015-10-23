'use strict';

angular.module('diaApp')
  .directive('rdWidgetFooter', function() {
    var directive = {
      requires: '^rdWidget',
      transclude: true,
      template: '<div class="widget-footer" ng-transclude></div>',
      restrict: 'E'
    };
    return directive;
  });