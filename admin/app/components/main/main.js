'use strict';

angular.module('diaApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/components/dashboard/dashboard.html',
        data: {
          authorizedRoles: ["ADMIN"]
        }
      });
  })
  .controller('MainCtrl', function($scope, $cookieStore,USER_ROLES,AuthService) {
    $scope.currentUser = null;
    $scope.userRoles = USER_ROLES;
    $scope.isAuthorized = AuthService.isAuthorized;

    /**
     * Sidebar Toggle & Cookie Control
     */
    var mobileView = 992;

    $scope.getWidth = function() {
        return window.innerWidth;
    };

    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
        //RR
        oldValue = 1;
        if (newValue >= mobileView) {
            if (angular.isDefined($cookieStore.get('toggle'))) {
                $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
            } else {
                $scope.toggle = true;
            }
        } else {
            $scope.toggle = false;
        }

    });

    $scope.toggleSidebar = function() {
        $scope.toggle = !$scope.toggle;
        $cookieStore.put('toggle', $scope.toggle);
    };

    window.onresize = function() {
        $scope.$apply();
    };

  $scope.setCurrentUser = function (user) {
    //console.log("setCurrentUser",user);
    $scope.currentUser = user;
  };
  AuthService.trySessionRestore($scope.setCurrentUser);
})
  .run(function ($rootScope, AUTH_EVENTS, AuthService, $location) {
    $rootScope.$on('$routeChangeStart', function (event, next) {
      //console.log("routeChangeStart",next);
      if(next.data){
        var authorizedRoles = next.data.authorizedRoles;
        //console.log("authorizedRoles",authorizedRoles);
        if (!AuthService.isAuthorized(authorizedRoles)) {
          //console.log("!authorizedRoles");
          event.preventDefault();
          if (AuthService.isAuthenticated()) {
            //console.log("isAuthenticated");
            // user is not allowedx x
            $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
          } else {
            //console.log("!isAuthenticated");
            // user is not logged in
            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
            $location.path( "/login" );
          }
        }
      }
    });
});



