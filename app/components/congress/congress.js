'use strict';

angular.module('diaApp')
  .config(function ($routeProvider) {


    $routeProvider
      .when('/congresos', {
        templateUrl: 'components/congress/congresses.html',
        controllerAs: 'congressCtrl',
        controller: function ($scope, CongressService) {
          $scope.congresses = [];
          CongressService.getAll($scope.currentUser.sessionId)
            .success(function (data) {
              $scope.congresses = data.result;
            });
        }
      })
      .when('/congresos/crear', {
        templateUrl: 'components/congress/congress.html',
        controllerAs: 'congressCtrl',
        controller: function ($scope, CongressService,$location) {

          $scope.congress = {
            nombre:"Nombre",
            ponencia:"Ponencia",
            lugar:"Lugar",
            fecha_congreso:"2015-11-11",
            patrocinio: 1
          };

          $scope.addCongress = function(){
            $scope.congress.session_id = $scope.currentUser.sessionId;
            CongressService.create($scope.congress)
              .then(function(){
                $scope.congress = {};
                $location.path( "/congresos" );
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
          var congresses = [];
          $scope.congress = {};

          CongressService.getAll($scope.currentUser.sessionId)
            .success(function (data) {
              var id = $routeParams.id;
              congresses = data.result;

              $scope.congress= congresses.filter(function (el) {
                return (el.id === +id);
              })[0];
            });
          // UPDATE
        }
      });
  });
