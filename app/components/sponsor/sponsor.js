'use strict';

angular.module('diaApp')
  .config(function ($routeProvider) {

    var SponsorsListCtrl = function ($scope, Session, SponsorService) {
      SponsorService.getAll(Session.id)
        .then(function (sponsors) {
          $scope.sponsors = sponsors.data.result;
          SponsorService.sponsors = $scope.sponsors;
          $scope.hasSponsors = ($scope.sponsors.length >= 0);
        }, function(err){
          console.error(err);
        });
    };

    var SponsorsCreateCtrl = function ($scope, Session, SponsorService,$location) {
      $scope.sponsor = {
        session_id: Session.id
      };
      $scope.setSponsor = function(){
        SponsorService.create($scope.sponsor)
          .then(function(ok){
            console.log(ok);
            if(ok){
              $scope.sponsor = {};
              $location.path( "/patrocinadores" );
            }
          },function(err){
            console.error(err);
          });
      };
    };

    var SponsorsDetailsCtrl = function ($scope, ParticipantService, $routeParams) {
      var id = $routeParams.id;
      $scope.participant = ParticipantService.participants.filter(function (el) {
        return (el.id === +id);
      })[0];
    };

    $routeProvider
      .when('/patrocinadores', {
        templateUrl: 'components/sponsor/sponsors.html',
        controller: SponsorsListCtrl,
        data: {
          authorizedRoles: ["ADMIN"]
        }
      })
      .when('/patrocinadores/crear', {
        templateUrl: 'components/sponsor/sponsor.html',
        controller: SponsorsCreateCtrl,
        data: {
          authorizedRoles: ["ADMIN"]
        }
      })
      .when('/patrocinadores/:id', {
        templateUrl: 'components/sponsor/sponsor.html',
        controller: SponsorsDetailsCtrl,
        data: {
          authorizedRoles: ["ADMIN"]
        }
      });
  });
