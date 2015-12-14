'use strict';

angular.module('diaApp', [
  'config',
  'ngAnimate',
  'ngAria',
  'ngCookies',
  'ngMessages',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'angular-loading-bar',
  'ngAnimate',
  'ui.toggle',
  "diaAppFilters",
  "localytics.directives",
  "ui.bootstrap",
  'angularUtils.directives.dirPagination'
]).config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
  cfpLoadingBarProvider.includeSpinner = false;
}]);
