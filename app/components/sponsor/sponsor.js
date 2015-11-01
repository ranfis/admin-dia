'use strict';

angular.module('diaApp')
  .config(function ($routeProvider) {


    $routeProvider
      .when('/patrocinadores', {
        templateUrl: 'components/sponsor/sponsors.html',
        controllerAs: 'sponsorCtrl',
        controller: function ($scope, SponsorService) {
          $scope.sponsors = [];
          SponsorService.getAll($scope.currentUser.sessionId)
            .then(function (sponsors) {
              $scope.sponsors = sponsors;
              SponsorService.sponsors = $scope.sponsors;
              $scope.hasSponsors = ($scope.sponsors.length >= 0);
            },function(err){
              console.error(err);
            });
        }
      })
      .when('/patrocinadores/crear', {
        templateUrl: 'components/sponsor/sponsor.html',
        controllerAs: 'sponsorCtrl',
        controller: function ($scope, SponsorService,$location) {
          $scope.sponsor = {};

          $scope.setSponsor = function(){
            $scope.sponsor.session_id = $scope.currentUser.sessionId;
            SponsorService.create($scope.sponsor)
              .then(function(ok){
                if(ok){
                  $scope.sponsor = {};
                  $location.path( "/patrocinadores" );
                }
              },function(err){
                console.error(err);
              });
          };
        }
      })
      .when('/patrocinadores/:id', {
        templateUrl: 'components/sponsor/sponsor.html',
        controllerAs: 'sponsorCtrl',
        controller: function ($scope, SponsorService, $routeParams, $location) {
          $scope.sponsor = {};
          var id = $routeParams.id;
          $scope.sponsor = SponsorService.sponsors.filter(function (el) {
            return (el.id === +id);
          })[0];

          $scope.setSponsor = function(){
            $scope.sponsor.session_id = $scope.currentUser.sessionId;
            console.log("b update",$scope.sponsor);
            SponsorService.update($scope.sponsor)
              .then(function(ok){
                console.log("a update");
                if(ok){
                  $scope.sponsor = {};
                  $location.path( "/patrocinadores" );
                }
              },function(err){
                console.error("au",err);
              });
          };
        }
      });
  });
