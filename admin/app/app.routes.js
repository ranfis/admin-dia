'use strict';

App.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'components/main.html',
        data: {
          authorizedRoles: ["ADMIN"]
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  });
