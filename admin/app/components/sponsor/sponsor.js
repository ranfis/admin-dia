'use strict';

var GenericService = GenericService || {};

angular.module('diaApp').service('SponsorService', new GenericService("sponsor"));

angular.module('diaApp')
  .config(function ($routeProvider) {

    var SponsorsListCtrl = function ($scope, Session, Alert, SponsorService) {
      SponsorService.list(Session.id)
        .then(function (res) {
          $scope.sponsors = res.data.result;
          SponsorService.sponsors = $scope.sponsors;
        }, function(err){
          Alert.error(err.message,"¡Error!");
        });

      $scope.deleteSponsor = function(id,index){
        Alert.confirm("Este patrocinador se borrará","¿Está seguro?","Si, borrar",function(){
          SponsorService.delete(id,Session.id)
            .then(function(msg){
              if(msg === "OK"){
                $scope.sponsors.splice(index, 1);
                Alert.success("El patrocinador se ha borrado con exito","¡Patrocinador borrado!");
              }
              else{
                Alert.error(msg,"¡Error!");
              }
            }, function (err) {
              Alert.error(err.message,"¡Error!");
            });
        });
      };
    };

    var SponsorsCreateCtrl = function ($scope, Session, Alert, SponsorService,$location) {
      $scope.sponsor = {
        session_id: Session.id
      };
      $scope.addSponsor = function(form){
        if (!form.$valid){return;}
        SponsorService.create($scope.sponsor)
          .then(function(msg){
            if(msg === "OK"){
              $scope.sponsor = {};
              Alert.success("El patrocinador se ha creado con exito","¡Patrocinador creado!");
              $location.path( "/patrocinadores" );
            }
            else{
              Alert.error(msg,"¡Error!");
            }
          },function(err){
            Alert.error(err.message,"¡Error!");
          });
      };
    };

    var SponsorsDetailsCtrl = function ($scope, Session, Alert, SponsorService, $routeParams, $location  ) {
      var id = $routeParams.id;
      $scope.sponsor = SponsorService.sponsors.filter(function (el) {
        return (el.id === +id);
      })[0];
      $scope.sponsor.session_id = Session.id;

      $scope.addSponsor = function(form){
        if (!form.$valid){return;}
        SponsorService.update($scope.sponsor)
          .then(function(msg){
            if(msg === "OK"){
              Alert.success("El patrocinador se ha actualizado con exito","¡Patrocinador actualizado!");
              $location.path( "/patrocinadores" );
            }
            else{
              Alert.error(msg,"¡Error!");
            }
          }, function (err) {
            Alert.error(err.message,"¡Error!");
          });
      };
    };

    $routeProvider
      .when('/patrocinadores', {
        templateUrl: 'app/components/sponsor/sponsors.html',
        controller: SponsorsListCtrl,
        data: {
          authorizedRoles: ["ADMIN"]
        }
      })
      .when('/patrocinadores/crear', {
        templateUrl: 'app/components/sponsor/sponsor.html',
        controller: SponsorsCreateCtrl,
        data: {
          authorizedRoles: ["ADMIN"]
        }
      })
      .when('/patrocinadores/:id', {
        templateUrl: 'app/components/sponsor/sponsor.html',
        controller: SponsorsDetailsCtrl,
        data: {
          authorizedRoles: ["ADMIN"]
        }
      });
  });
