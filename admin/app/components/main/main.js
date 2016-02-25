'use strict';

angular.module('diaApp')
  .controller('MainCtrl', function($scope,$rootScope, $cookieStore,USER_ROLES,AuthService, MESSAGES) {
    $scope.currentUser = null;
    $scope.userRoles = USER_ROLES;
    $scope.isAuthorized = AuthService.isAuthorized;
    $rootScope.title = "";
    $rootScope.nav = "";
    $rootScope.loggedIn = false;

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
    $rootScope.loggedIn = true;
  };
  AuthService.trySessionRestore($scope.setCurrentUser);
})
  .run(function ($rootScope, AUTH_EVENTS, AuthService, $location, Alert, MESSAGES, Session, Helper) {
    $rootScope.$on('$routeChangeStart', function (event, next) {
      $rootScope.loggedIn = false;
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
            Alert.error(MESSAGES.ERROR.NOT_ALLOWED, MESSAGES.ERROR_TEXT);
            $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
          } else {
            //console.log("!isAuthenticated");
            // user is not logged in
            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
            $location.path( "/login" );
          }
        } else {
          $rootScope.loggedIn = true;
          $rootScope.username = "Sistema DIA";

          //HIDE THE SIDEBAR OPTIONS FOR USERS ROLE
          if (Session.userRole == "REPORT") {
            Helper.setSidebarVisibility(CLASSES.NONE, CLASSES.NONE);
          } else if(Session.userRole == "ADMIN") {
            Helper.setSidebarVisibility(CLASSES.INITIAL, CLASSES.NONE);
          } else {
            Helper.setSidebarVisibility(CLASSES.INITIAL, CLASSES.INITIAL);
          }

        }

      }
    });
});



