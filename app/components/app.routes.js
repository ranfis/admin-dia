'use strict';

angular
  .module('diaApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'components/main.html',
        controller: 'MasterCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'components/about/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/tables', {
        templateUrl: 'components/tables.html',
        controller: 'MasterCtrl',
        controllerAs: 'about'
      })
      .when('/dashboard', {
        templateUrl: 'components/dashboard/dashboard.html',
        controller: 'MasterCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
