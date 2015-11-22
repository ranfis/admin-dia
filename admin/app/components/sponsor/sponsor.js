'use strict';

var GenericService = GenericService || {};

angular.module('diaApp').service('SponsorService', new GenericService("sponsor"));

angular.module('diaApp')
  .config(function ($routeProvider, USER_ROLES, PATH, MESSAGES) {

    var SponsorsListCtrl = function ($scope, Session, Alert, SponsorService) {
      SponsorService.list(Session.id)
        .then(function (res) {
          $scope.sponsors = res.data.result;
          SponsorService.sponsors = $scope.sponsors;
        }, function(err){
          Alert.error(err.message,MESSAGES.ERROR_TEXT);
        });

      $scope.deleteSponsor = function(id,index){
        Alert.confirm(MESSAGES.DELETE_ELEMENT,MESSAGES.DELETE_QUESTION,MESSAGES.DELETE_CONFIRM,function(){
          SponsorService.delete(id,Session.id)
            .then(function(msg){
              if(msg === "OK"){
                $scope.sponsors.splice(index, 1);
                Alert.success(MESSAGES.SPONSOR+" "+MESSAGES.NOTIFICATION_DELETE_SUCCESS,"¡"+MESSAGES.SPONSOR+" "+MESSAGES.NOTIFICATION_DELETE_NAME+"!");
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
              Alert.success(MESSAGES.SPONSOR+" "+MESSAGES.NOTIFICATION_CREATE_SUCCESS,"¡"+MESSAGES.SPONSOR+" "+MESSAGES.NOTIFICATION_CREATE_NAME+"!");
              $location.path(PATH.SPONSOR.LIST);
            }
            else{
              Alert.error(msg,MESSAGES.ERROR_TEXT);
            }
          },function(err){
            Alert.error(err.message,MESSAGES.ERROR_TEXT);
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
              Alert.success(MESSAGES.SPONSOR+" "+MESSAGES.NOTIFICATION_UPDATE_SUCCESS,"¡"+MESSAGES.SPONSOR+" "+MESSAGES.NOTIFICATION_UPDATE_NAME+"!");
              $location.path(PATH.SPONSOR.LIST);
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
      .when(PATH.SPONSOR.LIST, {
        templateUrl: 'app/components/sponsor/sponsors.html',
        controller: SponsorsListCtrl,
        data: {
          authorizedRoles: [USER_ROLES.ADMIN]
        }
      })
      .when(PATH.SPONSOR.CREATE, {
        templateUrl: 'app/components/sponsor/sponsor.html',
        controller: SponsorsCreateCtrl,
        data: {
          authorizedRoles: [USER_ROLES.ADMIN]
        }
      })
      .when(PATH.SPONSOR.EDIT, {
        templateUrl: 'app/components/sponsor/sponsor.html',
        controller: SponsorsDetailsCtrl,
        data: {
          authorizedRoles: [USER_ROLES.ADMIN]
        }
      });
  });
