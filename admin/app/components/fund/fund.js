'use strict';

var GenericService = GenericService || {};

angular.module('diaApp').service('FundService', new GenericService("fund"));

angular.module('diaApp').config(function ($routeProvider, USER_ROLES, PATH, MESSAGES) {

  var FundsListCtrl = function ($scope, Session, Alert, FundService) {
    FundService.list(Session.id)
      .then(function (res) {
        $scope.funds = res.data.result;
        FundService.funds = $scope.funds;
      }, function(err){
        Alert.error(err.message,MESSAGES.ERROR_TEXT);
      });

    $scope.deleteFund = function(id,index){
      Alert.confirm(MESSAGES.DELETE_ELEMENT,MESSAGES.DELETE_QUESTION,MESSAGES.DELETE_CONFIRM,function(){
        FundService.delete(id,Session.id)
          .then(function(msg){
            if(msg === "OK"){
              $scope.funds.splice(index, 1);
              Alert.success(MESSAGES.FUND+" "+MESSAGES.NOTIFICATION_DELETE_SUCCESS,"¡"+MESSAGES.FUND+" "+MESSAGES.NOTIFICATION_DELETE_NAME+"!");
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
            Alert.success(MESSAGES.FUND+" "+MESSAGES.NOTIFICATION_CREATE_SUCCESS,"¡"+MESSAGES.FUND+" "+MESSAGES.NOTIFICATION_CREATE_NAME+"!");
            $location.path(PATH.FUND.LIST);
          }
          else{
            Alert.error(msg,MESSAGES.ERROR_TEXT);
          }
        },function(err){
          Alert.error(err.message,MESSAGES.ERROR_TEXT);
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
            Alert.success(MESSAGES.FUND+" "+MESSAGES.NOTIFICATION_UPDATE_SUCCESS,"¡"+MESSAGES.FUND+" "+MESSAGES.NOTIFICATION_UPDATE_NAME+"!");
            $location.path(PATH.FUND.LIST);
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
    .when(PATH.FUND.LIST, {
      templateUrl: PATH.FUND.PLURAL,
      controller: FundsListCtrl,
      data: {
        authorizedRoles: [USER_ROLES.ADMIN]
      }
    })
    .when(PATH.FUND.CREATE, {
      templateUrl: PATH.FUND.SINGLE,
      controller: FundsCreateCtrl,
      data: {
        authorizedRoles: [USER_ROLES.ADMIN]
      }
    })
    .when(PATH.FUND.EDIT, {
      templateUrl: PATH.FUND.SINGLE,
      controller: FundsDetailsCtrl,
      data: {
        authorizedRoles: [USER_ROLES.ADMIN]
      }
    });
});
