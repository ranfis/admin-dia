'use strict';

var GenericService = GenericService || {};

angular.module('diaApp').service('UnitService', new GenericService("executing_unit"));

angular.module('diaApp').config(function ($routeProvider, USER_ROLES, PATH, MESSAGES) {

  var UnitsListCtrl = function ($scope, Session, Alert, UnitService) {
    UnitService.list(Session.id)
      .then(function (res) {
        $scope.units = res.data.result;
        UnitService.units = $scope.units;
      }, function(err){
        Alert.error(err.message,MESSAGES.ERROR_TEXT);
      });

    $scope.deleteUnit = function(id,index){
      Alert.confirm(MESSAGES.DELETE_ELEMENT,MESSAGES.DELETE_QUESTION,MESSAGES.DELETE_CONFIRM,function(){
        UnitService.delete(id,Session.id)
          .then(function(msg){
            if(msg === "OK"){
              $scope.units.splice(index, 1);
              Alert.success(MESSAGES.UNIT+" "+MESSAGES.NOTIFICATION_DELETE_SUCCESS,"¡"+MESSAGES.UNIT+" "+MESSAGES.NOTIFICATION_DELETE_NAME+"!");
            }
            else{
              Alert.error(msg,MESSAGES.ERROR_TEXT);
            }
          }, function (err) {
            Alert.error(err.message,MESSAGES.ERROR_TEXT);
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
            Alert.success(MESSAGES.UNIT+" "+MESSAGES.NOTIFICATION_CREATE_SUCCESS,"¡"+MESSAGES.UNIT+" "+MESSAGES.NOTIFICATION_CREATE_NAME+"!");
            $location.path(PATH.UNIT.LIST);
          }
          else{
            Alert.error(msg,MESSAGES.ERROR_TEXT);
          }
        },function(err){
          Alert.error(err.message,MESSAGES.ERROR_TEXT);
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
            Alert.success(MESSAGES.UNIT+" "+MESSAGES.NOTIFICATION_UPDATE_SUCCESS,"¡"+MESSAGES.UNIT+" "+MESSAGES.NOTIFICATION_UPDATE_NAME+"!");
            $location.path(PATH.UNIT.LIST);
          }
          else{
            Alert.error(msg,MESSAGES.ERROR_TEXT);
          }
        }, function (err) {
          Alert.error(err.message,MESSAGES.ERROR_TEXT);
        });
    };
  };

  $routeProvider
    .when(PATH.UNIT.LIST, {
      templateUrl: 'app/components/unit/units.html',
      controller: UnitsListCtrl,
      data: {
        authorizedRoles: ["ADMIN"]
      }
    })
    .when(PATH.UNIT.CREATE, {
      templateUrl: 'app/components/unit/unit.html',
      controller: UnitsCreateCtrl,
      data: {
        authorizedRoles: ["ADMIN"]
      }
    })
    .when(PATH.UNIT.EDIT, {
      templateUrl: 'app/components/unit/unit.html',
      controller: UnitsDetailsCtrl,
      data: {
        authorizedRoles: ["ADMIN"]
      }
    });
});
