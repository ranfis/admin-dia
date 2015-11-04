'use strict';

angular.module('diaApp')
  .config(function ($routeProvider) {

    var CongressListCtrl = function ($scope, Session,CongressService) {
      CongressService.getAll(Session.id)
        .then(function(congresses){
          $scope.congresses = congresses.data.result;
          CongressService.congresses = $scope.congresses;
          $scope.hasCongresses = ($scope.congresses.length >= 0);
        }, function(err){
          console.error(err);
        });
    };

    var CongressCreateCtrl = function ($scope, Session, sponsors, participants, CongressService, $location) {
      $scope.sponsors = sponsors.data.result;
      $scope.participants = participants.data.result;
      $scope.congress = {
        session_id: Session.id
      };
      $scope.addCongress = function(){
        $scope.congress.patrocinio = 1;
        CongressService.create($scope.congress)
          .then(function(ok){
            if(ok){
              $scope.congress = {};
              $location.path( "/congresos" );
            }
          },function(err){
            console.error(err);
          });
      };
    };

    CongressCreateCtrl.resolve = {
      sponsors: function(SponsorService, Session){
        return SponsorService.getAll(Session.id);
      },
      participants: function(ParticipantService, Session){
        return ParticipantService.getAll(Session.id);
      }
    };

    $routeProvider
      .when('/congresos', {
        templateUrl: 'components/congress/congresses.html',
        controller: CongressListCtrl,
        data: {
          authorizedRoles: ["ADMIN"]
        }
      })
      .when('/congresos/crear', {
        templateUrl: 'components/congress/congress.html',
        controller: CongressCreateCtrl,
        resolve:CongressCreateCtrl.resolve,
        data: {
          authorizedRoles: ["ADMIN"]
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
