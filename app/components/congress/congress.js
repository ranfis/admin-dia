'use strict';

angular.module('diaApp')
  .config(function ($routeProvider) {

    var CongressesListCtrl = function ($scope, Session, CongressService) {
      CongressService.getAll(Session.id)
        .then(function (res) {
          $scope.congresses = res.data.result;
          CongressService.congresses = $scope.congresses;
        }, function(err){
          show.error(err.message,"¡Error!");
        });

      $scope.deleteCongress = function(id,index){
        show.confirm("Este congreso se borrará","¿Está seguro?","Si, borrar",function(){
          CongressService.delete(id,Session.id)
            .then(function (ok) {
              if (ok) {
                $scope.congresses.splice(index, 1);
                show.success("El congreso se ha borrado con exito","¡Congreso borrado!");
              }
            }, function (err) {
              show.error(err.message,"¡Error!");
            });
        });
      }
    };

    var CongressesCreateCtrl = function ($scope, Session, sponsors, participants, CongressService,$location) {
      $scope.sponsors = sponsors.data.result;
      $scope.participants = participants.data.result;
      $scope.congress = {
        session_id: Session.id
      };
      $scope.addCongress = function(form){
        if (!form.$valid) return;
        CongressService.create($scope.congress)
          .then(function(ok){
            if(ok){
              $scope.congress = {};
              show.success("El congreso se ha creado con exito","¡Congreso creado!");
              $location.path( "/congresos" );
            }
          },function(err){
            show.error(err.message,"¡Error!");
          });
      };
    };

    var CongressesDetailsCtrl = function ($scope, Session, sponsors, participants, CongressService, $routeParams, $location  ) {
      $scope.sponsors = sponsors.data.result;
      $scope.participants = participants.data.result;
      var id = $routeParams.id;
      $scope.congress = CongressService.congresses.filter(function (el) {
        return (el.id === +id);
      })[0];
      $scope.congress.session_id = Session.id;

      $scope.addCongress = function(form){
        if (!form.$valid) return;
        CongressService.update($scope.congress)
          .then(function (ok) {
            if (ok) {
              show.success("El congreso se ha actualizado con exito","¡Congreso actualizado!");
              $location.path( "/congresos" );
            }
          }, function (err) {
            show.error(err.message,"¡Error!");
          });
      }
    };

    CongressesCreateCtrl.resolve = {
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
        controller: CongressesListCtrl,
        data: {
          authorizedRoles: ["ADMIN"]
        }
      })
      .when('/congresos/crear', {
        templateUrl: 'components/congress/congress.html',
        controller: CongressesCreateCtrl,
        resolve: CongressesCreateCtrl.resolve,
        data: {
          authorizedRoles: ["ADMIN"]
        }
      })
      .when('/congresos/:id', {
        templateUrl: 'components/congress/congress.html',
        controller: CongressesDetailsCtrl,
        resolve: CongressesCreateCtrl.resolve,
        data: {
          authorizedRoles: ["ADMIN"]
        }
      });
  });
