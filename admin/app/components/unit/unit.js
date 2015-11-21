'use strict';

var GenericService = GenericService || {};

angular.module('diaApp').service('UnitService', new GenericService("executing_unit"));

angular.module('diaApp').config(function ($routeProvider) {

  var UnitsListCtrl = function ($scope, Session, Alert, UnitService) {
    UnitService.list(Session.id)
      .then(function (res) {
        $scope.units = res.data.result;
        UnitService.units = $scope.units;
      }, function(err){
        Alert.error(err.message,"¡Error!");
      });

    $scope.deleteUnit = function(id,index){
      Alert.confirm("Late unidad se borrará","¿Está seguro?","Si, borrar",function(){
        UnitService.delete(id,Session.id)
          .then(function(msg){
            if(msg === "OK"){
              $scope.units.splice(index, 1);
              Alert.success("La unidad se ha borrado con exito","¡Unidad borrada!");
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

  var UnitsCreateCtrl = function ($scope, Session, Alert, UnitService,$location) {
    $scope.unit = {
      session_id: Session.id
    };
    $scope.addUnit = function(form){
      if (!form.$valid){return;}
      UnitService.create($scope.unit)
        .then(function(msg){
          if(msg === "OK"){
            $scope.unit = {};
            Alert.success("La unidad se ha creado con exito","¡Unidad creada!");
            $location.path( "/unidades" );
          }
          else{
            Alert.error(msg,"¡Error!");
          }
        },function(err){
          Alert.error(err.message,"¡Error!");
        });
    };
  };

  var UnitsDetailsCtrl = function ($scope, Session, Alert, UnitService, $routeParams, $location  ) {
    var id = $routeParams.id;
    $scope.unit = UnitService.units.filter(function (el) {
      return (el.id === +id);
    })[0];
    $scope.unit.session_id = Session.id;

    $scope.addUnit = function(form){
      if (!form.$valid){return;}
      UnitService.update($scope.unit)
        .then(function(msg){
          if(msg === "OK"){
            Alert.success("La unidad se ha actualizado con exito","¡Unidad actualizada!");
            $location.path( "/unidades" );
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
    .when('/unidades', {
      templateUrl: 'app/components/unit/units.html',
      controller: UnitsListCtrl,
      data: {
        authorizedRoles: ["ADMIN"]
      }
    })
    .when('/unidades/crear', {
      templateUrl: 'app/components/unit/unit.html',
      controller: UnitsCreateCtrl,
      data: {
        authorizedRoles: ["ADMIN"]
      }
    })
    .when('/unidades/:id', {
      templateUrl: 'app/components/unit/unit.html',
      controller: UnitsDetailsCtrl,
      data: {
        authorizedRoles: ["ADMIN"]
      }
    });
});
