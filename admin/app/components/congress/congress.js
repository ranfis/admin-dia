'use strict';

var GenericService = GenericService || {};

angular.module('diaApp').service('CongressService', new GenericService("congress"));

angular.module('diaApp').config(function ($routeProvider, USER_ROLES, PATH, MESSAGES) {

    var CongressesListCtrl = function ($scope, Session,Alert, CongressService) {
      CongressService.list(Session.id)
        .then(function (res) {
          $scope.congresses = res.data.result;
          CongressService.congresses = $scope.congresses;
        }, function(err){
          Alert.error(err.message,MESSAGES.ERROR_TEXT);
        });

      $scope.deleteCongress = function(id,index){
        Alert.confirm(MESSAGES.DELETE_ELEMENT,MESSAGES.DELETE_QUESTION,MESSAGES.DELETE_CONFIRM,function(){
          CongressService.delete(id,Session.id)
            .then(function(msg){
              if(msg === "OK"){
                $scope.congresses.splice(index, 1);
                Alert.success(MESSAGES.CONGRESS+" "+MESSAGES.NOTIFICATION_DELETE_SUCCESS,"¡"+MESSAGES.CONGRESS+" "+MESSAGES.NOTIFICATION_DELETE_NAME+"!");
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

    var CongressesCreateCtrl = function ($scope, Session, Alert, SponsorService, ParticipantService, CongressService,$location) {
      SponsorService.list(Session.id)
        .then(function(res){
          $scope.sponsors = res.data.result;
        });
      ParticipantService.list(Session.id)
        .then(function(res){
          $scope.participants = res.data.result;
        });
      $scope.congress = {
        session_id: Session.id
      };
      $scope.addCongress = function(form){
        if (!form.$valid){return;}
        $scope.congress.fecha_congreso = $scope.congress.fecha_congreso+"-00-00";
        CongressService.create($scope.congress)
          .then(function(msg){
            if(msg === "OK"){
              $scope.congress = {};
              Alert.success(MESSAGES.CONGRESS+" "+MESSAGES.NOTIFICATION_CREATE_SUCCESS,"¡"+MESSAGES.CONGRESS+" "+MESSAGES.NOTIFICATION_CREATE_NAME+"!");
              $location.path(PATH.CONGRESS.LIST);
            }
            else{
              Alert.error(msg,MESSAGES.ERROR_TEXT);
            }
          },function(err){
            Alert.error(err.message,MESSAGES.ERROR_TEXT);
          });
      };
    };

    var CongressesDetailsCtrl = function ($scope, Session, Alert, Helper, SponsorService, ParticipantService, CongressService, $routeParams, $location  ) {
      SponsorService.list(Session.id)
        .then(function(res){
          $scope.sponsors = res.data.result;
        });
      ParticipantService.list(Session.id)
        .then(function(res){
          $scope.participants = res.data.result;
        });
      $scope.congress = Helper.selectById(CongressService.congresses, $routeParams.id); // Getting the selected congress from memory
      $scope.congress.fecha_congreso = +$scope.congress.fecha_congreso.slice(0,4);
      $scope.congress.session_id = Session.id;
      $scope.congress.participantes = Helper.getIDs($scope.congress.participantes); // Retrieve the actual select value
      $scope.congress.patrocinio = $scope.congress.patrocinio.id; // Retrieve the actual select value
      $scope.addCongress = function(form){
        if (!form.$valid){return;}
        $scope.congress.fecha_congreso = $scope.congress.fecha_congreso+"-00-00";
        CongressService.update($scope.congress)
          .then(function (msg) {
            if (msg === "OK") {
              Alert.success(MESSAGES.CONGRESS+" "+MESSAGES.NOTIFICATION_UPDATE_SUCCESS,"¡"+MESSAGES.CONGRESS+" "+MESSAGES.NOTIFICATION_UPDATE_NAME+"!");
              $location.path(PATH.CONGRESS.LIST);
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
      .when(PATH.CONGRESS.LIST, {
        templateUrl: PATH.CONGRESS.PLURAL,
        controller: CongressesListCtrl,
        data: {
          authorizedRoles: [USER_ROLES.ADMIN]
        }
      })
      .when(PATH.CONGRESS.CREATE, {
        templateUrl: PATH.CONGRESS.SINGLE,
        controller: CongressesCreateCtrl,
        data: {
          authorizedRoles: [USER_ROLES.ADMIN]
        }
      })
      .when(PATH.CONGRESS.EDIT, {
        templateUrl: PATH.CONGRESS.SINGLE,
        controller: CongressesDetailsCtrl,
        data: {
          authorizedRoles: [USER_ROLES.ADMIN]
        }
      });
  });
