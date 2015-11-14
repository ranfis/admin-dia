'use strict';

angular.module('diaApp')
  .config(function ($routeProvider) {

    var SponsorsListCtrl = function ($scope, Session, SponsorService) {
      SponsorService.getAll(Session.id)
        .then(function (res) {
          $scope.sponsors = res.data.result;
          SponsorService.sponsors = $scope.sponsors;
        }, function(err){
          show.error(err.message,"¡Error!");
        });

      $scope.deleteSponsor = function(id,index){
        show.confirm("Este patrocinador se borrará","¿Está seguro?","Si, borrar",function(){
          SponsorService.delete(id,Session.id)
            .then(function (ok) {
              if (ok) {
                $scope.sponsors.splice(index, 1);
                show.success("El patrocinador se ha borrado con exito","¡Patrocinador borrado!");
              }
            }, function (err) {
              show.error(err.message,"¡Error!");
            });
        });
      }
    };

    var SponsorsCreateCtrl = function ($scope, Session, SponsorService,$location) {
      $scope.sponsor = {
        session_id: Session.id
      };
      $scope.addSponsor = function(form){
        if (!form.$valid) return;
        SponsorService.create($scope.sponsor)
          .then(function(ok){
            if(ok){
              $scope.sponsor = {};
              show.success("El patrocinador se ha creado con exito","¡Patrocinador creado!");
              $location.path( "/patrocinadores" );
            }
          },function(err){
            show.error(err.message,"¡Error!");
          });
      };
    };

    var SponsorsDetailsCtrl = function ($scope, Session, SponsorService, $routeParams, $location  ) {
      var id = $routeParams.id;
      $scope.sponsor = SponsorService.sponsors.filter(function (el) {
        return (el.id === +id);
      })[0];
      $scope.sponsor.session_id = Session.id;

      $scope.addSponsor = function(form){
        if (!form.$valid) return;
        SponsorService.update($scope.sponsor)
          .then(function (ok) {
            if (ok) {
              show.success("El patrocinador se ha actualizado con exito","¡Patrocinador actualizado!");
              $location.path( "/patrocinadores" );
            }
          }, function (err) {
            show.error(err.message,"¡Error!");
          });
      }
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
