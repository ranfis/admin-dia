'use strict';

/**
 * @ngdoc overview
 * @name diaApp
 * @description
 * # diaApp
 *
 * Main module of the application.
 */
angular
  .module('diaApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/tables', {
        templateUrl: 'views/tables.html',
        controller: 'MasterCtrl',
        controllerAs: 'about'
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'MasterCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
