'use strict';

var GenericService = GenericService || {};

angular.module('diaApp').service('FundService', new GenericService("fund"));

angular.module('diaApp').config(function ($routeProvider) {

  var FundsListCtrl = function ($scope, Session, Alert, FundService) {
    FundService.list(Session.id)
      .then(function (res) {
        $scope.funds = res.data.result;
        FundService.funds = $scope.funds;
      }, function(err){
        Alert.error(err.message,"¡Error!");
      });

    $scope.deleteFund = function(id,index){
      Alert.confirm("Este fondo se borrará","¿Está seguro?","Si, borrar",function(){
        FundService.delete(id,Session.id)
          .then(function(msg){
            if(msg === "OK"){
              $scope.funds.splice(index, 1);
              Alert.success("El fondo se ha borrado con exito","¡Fondo borrado!");
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

  var FundsCreateCtrl = function ($scope, Session, Alert, FundService,$location) {
    $scope.fund = {
      session_id: Session.id
    };
    $scope.addFund = function(form){
      if (!form.$valid){return;}
      FundService.create($scope.fund)
        .then(function(msg){
          if(msg === "OK"){
            $scope.fund = {};
            Alert.success("El fondo se ha creado con exito","¡Fondo creado!");
            $location.path( "/fondos" );
          }
          else{
            Alert.error(msg,"¡Error!");
          }
        },function(err){
          Alert.error(err.message,"¡Error!");
        });
    };
  };

  var FundsDetailsCtrl = function ($scope, Session, Alert, FundService, $routeParams, $location  ) {
    var id = $routeParams.id;
    $scope.fund = FundService.funds.filter(function (el) {
      return (el.id === +id);
    })[0];
    $scope.fund.session_id = Session.id;

    $scope.addFund = function(form){
      if (!form.$valid){return;}
      FundService.update($scope.fund)
        .then(function(msg){
          if(msg === "OK"){
            Alert.success("El fondo se ha actualizado con exito","¡Fondo actualizado!");
            $location.path( "/fondos" );
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
    .when('/fondos', {
      templateUrl: 'app/components/fund/funds.html',
      controller: FundsListCtrl,
      data: {
        authorizedRoles: ["ADMIN"]
      }
    })
    .when('/fondos/crear', {
      templateUrl: 'app/components/fund/fund.html',
      controller: FundsCreateCtrl,
      data: {
        authorizedRoles: ["ADMIN"]
      }
    })
    .when('/fondos/:id', {
      templateUrl: 'app/components/fund/fund.html',
      controller: FundsDetailsCtrl,
      data: {
        authorizedRoles: ["ADMIN"]
      }
    });
});
