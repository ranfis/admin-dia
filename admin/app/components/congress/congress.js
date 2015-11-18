'use strict';

var GenericService = GenericService || {};

angular.module('diaApp').service('CongressService', new GenericService("congress"));

angular.module('diaApp').config(function ($routeProvider) {

    var CongressesListCtrl = function ($scope, Session,Alert, CongressService) {
      CongressService.list(Session.id)
        .then(function (res) {
          $scope.congresses = res.data.result;
          CongressService.congresses = $scope.congresses;
        }, function(err){
          Alert.error(err.message,"¡Error!");
        });

      $scope.deleteCongress = function(id,index){
        Alert.confirm("Este congreso se borrará","¿Está seguro?","Si, borrar",function(){
          CongressService.delete(id,Session.id)
            .then(function(msg){
              if(msg === "OK"){
                $scope.congresses.splice(index, 1);
                Alert.success("El congreso se ha borrado con exito","¡Congreso borrado!");
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
              Alert.success("El congreso se ha creado con exito","¡Congreso creado!");
              $location.path( "/congresos" );
            }
            else{
              Alert.error(msg,"¡Error!");
            }
          },function(err){
            Alert.error(err.message,"¡Error!");
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
              Alert.success("El congreso se ha actualizado con exito","¡Congreso actualizado!");
              $location.path( "/congresos" );
            }
            else{
              Alert.error(msg,"¡Error!");
            }
          }, function (err) {
            Alert.error(err.message,"¡Error!");
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
      .when('/congresos', {
        templateUrl: 'app/components/congress/congresses.html',
        controller: CongressesListCtrl,
        data: {
          authorizedRoles: ["ADMIN"]
        }
      })
      .when('/congresos/crear', {
        templateUrl: 'app/components/congress/congress.html',
        controller: CongressesCreateCtrl,
        resolve: CongressesCreateCtrl.resolve,
        data: {
          authorizedRoles: ["ADMIN"]
        }
      })
      .when('/congresos/:id', {
        templateUrl: 'app/components/congress/congress.html',
        controller: CongressesDetailsCtrl,
        resolve: CongressesCreateCtrl.resolve,
        data: {
          authorizedRoles: ["ADMIN"]
        }
      });
  });
