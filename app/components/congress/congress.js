'use strict';

angular.module('diaApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/congresos', {
        templateUrl: 'components/congress/congresses.html',
        controllerAs: 'congressCtrl',
        controller: function ($scope, CongressService) {
          $scope.congresses = [];
          $scope.hasCongress = false;

          CongressService.getAll($scope.currentUser.sessionId)
            .then(function (congresses) {
              $scope.congresses = congresses;
              CongressService.congresses = $scope.congresses;
              $scope.hasCongresses = ($scope.congresses.length >= 0);
            }, function(err){
              console.error(err);
            });
        }
      })
      .when('/congresos/crear', {
        templateUrl: 'components/congress/congress.html',
        controllerAs: 'congressCtrl',
        controller: function ($scope, CongressService,$location) {

          $scope.congress = {
            session_id: $scope.currentUser.sessionId
          };

          $scope.addCongress = function(){
            CongressService.create($scope.congress)
              .then(function(ok){
                console.log(ok);
                if(ok){
                  $scope.congress = {};
                  $location.path( "/congresos" );
                }
              },function(err){
                console.error(err);
              });
          };
        }
      })
      .when('/congresos/:id', {
        templateUrl: 'components/congress/congress.html',
        controllerAs: 'congressCtrl',
        controller: function ($scope, CongressService, $routeParams) {
          $scope.congress = {};

          var id = $routeParams.id;
          $scope.congress = CongressService.congresses.filter(function (el) {
            return (el.id === +id);
          })[0];
        }
      });
  });
