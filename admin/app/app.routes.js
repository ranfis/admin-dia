'use strict';

angular.module('diaApp').config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/components/dashboard/dashboard.html',
        data: {
          authorizedRoles: ["ADMIN"]
        }
      })
      .otherwise({
        redirectTo: '/'
      });

/*  $locationProvider.html5Mode({
    enabled: true,
    requireBase: true
  });*/
});
