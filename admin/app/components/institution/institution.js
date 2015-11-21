'use strict';

var GenericService = GenericService || {};

angular.module('diaApp').service('InstitutionService', new GenericService("institution"));

angular.module('diaApp').config(function ($routeProvider) {

  var InstitutionsListCtrl = function ($scope, Session, Alert, InstitutionService) {
    InstitutionService.list(Session.id)
      .then(function (res) {
        $scope.institutions = res.data.result;
        InstitutionService.institutions = $scope.institutions;
      }, function(err){
        Alert.error(err.message,"¡Error!");
      });

    $scope.deleteInstitution = function(id,index){
      Alert.confirm("Este institución se borrará","¿Está seguro?","Si, borrar",function(){
        InstitutionService.delete(id,Session.id)
          .then(function(msg){
            if(msg === "OK"){
              $scope.institutions.splice(index, 1);
              Alert.success("La institución se ha borrado con exito","¡Institución borrada!");
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

  var InstitutionsCreateCtrl = function ($scope, Session, Alert, InstitutionService,$location) {
    $scope.institution = {
      session_id: Session.id
    };
    $scope.addInstitution = function(form){
      if (!form.$valid){return;}
      InstitutionService.create($scope.institution)
        .then(function(msg){
          if(msg === "OK"){
            $scope.institution = {};
            Alert.success("La institución se ha creado con exito","¡Institución creada!");
            $location.path( "/instituciones" );
          }
          else{
            Alert.error(msg,"¡Error!");
          }
        },function(err){
          Alert.error(err.message,"¡Error!");
        });
    };
  };

  var InstitutionsDetailsCtrl = function ($scope, Session, Alert, InstitutionService, $routeParams, $location  ) {
    var id = $routeParams.id;
    $scope.institution = InstitutionService.institutions.filter(function (el) {
      return (el.id === +id);
    })[0];
    $scope.institution.session_id = Session.id;

    $scope.addInstitution = function(form){
      if (!form.$valid){return;}
      InstitutionService.update($scope.institution)
        .then(function(msg){
          if(msg === "OK"){
            Alert.success("La institución se ha actualizado con exito","¡Institución actualizada!");
            $location.path( "/instituciones" );
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
    .when('/instituciones', {
      templateUrl: 'app/components/institution/institutions.html',
      controller: InstitutionsListCtrl,
      data: {
        authorizedRoles: ["ADMIN"]
      }
    })
    .when('/instituciones/crear', {
      templateUrl: 'app/components/institution/institution.html',
      controller: InstitutionsCreateCtrl,
      data: {
        authorizedRoles: ["ADMIN"]
      }
    })
    .when('/instituciones/:id', {
      templateUrl: 'app/components/institution/institution.html',
      controller: InstitutionsDetailsCtrl,
      data: {
        authorizedRoles: ["ADMIN"]
      }
    });
});
