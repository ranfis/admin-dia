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

    var CongressesCreateCtrl = function ($scope, Session, Alert, sponsors, participants, CongressService,$location) {
      $scope.sponsors = sponsors.data.result;
      $scope.participants = participants.data.result;
      $scope.congress = {
        session_id: Session.id
      };
      $scope.addCongress = function(form){
        if (!form.$valid){return;}
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

    var CongressesDetailsCtrl = function ($scope, Session, Alert, Helper, sponsors, participants, CongressService, $routeParams, $location  ) {
      $scope.sponsors = sponsors.data.result; // Needed to fill sponsors select box
      $scope.participants = participants.data.result; // Needed to fill participants select box
      $scope.congress = Helper.selectById(CongressService.congresses, $routeParams.id); // Getting the selected congress from memory
      $scope.congress.session_id = Session.id;
      $scope.congress.participantes = Helper.getIDs($scope.congress.participantes); // Retrieve the actual select value
      $scope.congress.patrocinio = $scope.congress.patrocinio.id; // Retrieve the actual select value
      $scope.addCongress = function(form){
        if (!form.$valid){return;}
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

    CongressesCreateCtrl.resolve = {
      sponsors: function(SponsorService, Session){
        return SponsorService.list(Session.id);
      },
      participants: function(ParticipantService, Session){
        return ParticipantService.list(Session.id);
      }
    };

    $routeProvider
      .when(PATH.CONGRESS.LIST, {
        templateUrl: 'app/components/congress/congresses.html',
        controller: CongressesListCtrl,
        data: {
          authorizedRoles: [USER_ROLES.ADMIN]
        }
      })
      .when(PATH.CONGRESS.CREATE, {
        templateUrl: 'app/components/congress/congress.html',
        controller: CongressesCreateCtrl,
        resolve: CongressesCreateCtrl.resolve,
        data: {
          authorizedRoles: [USER_ROLES.ADMIN]
        }
      })
      .when(PATH.CONGRESS.EDIT, {
        templateUrl: 'app/components/congress/congress.html',
        controller: CongressesDetailsCtrl,
        resolve: CongressesCreateCtrl.resolve,
        data: {
          authorizedRoles: [USER_ROLES.ADMIN]
        }
      });
  });
