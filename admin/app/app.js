'use strict';

angular.module('diaApp', [
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
  "ui.bootstrap"
]).config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
  cfpLoadingBarProvider.includeSpinner = false;
}]);
