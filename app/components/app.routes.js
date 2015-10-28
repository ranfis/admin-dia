'use strict';

angular
  .module('diaApp')
  .config(function ($routeProvider,USER_ROLES) {
    $routeProvider
      .when('/', {
        templateUrl: 'components/main.html',
        controller: 'MasterCtrl',
        controllerAs: 'main'
      })
      .when('/login', {
        templateUrl: 'components/login/login.html',
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
        controllerAs: 'master',
        data: {
          authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
        }
      })
      .when('/dashboard', {
        templateUrl: 'components/dashboard/dashboard.html',
        controller: 'MasterCtrl',
        controllerAs: 'master',
        data: {
          authorizedRoles: [USER_ROLES.admin]
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  });
