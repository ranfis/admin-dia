'use strict';

var GenericService = GenericService || {};

angular.module('diaApp').service('JournalService', new GenericService("journal"));

angular.module('diaApp').config(function ($routeProvider) {

    var JournalsListCtrl = function ($scope, Session, Alert, JournalService) {
      JournalService.list(Session.id)
        .then(function (res) {
          $scope.journals = res.data.result;
          JournalService.journals = $scope.journals;
        }, function(err){
          Alert.error(err.message,"¡Error!");
        });

      $scope.deleteJournal = function(id,index){
        Alert.confirm("Este revista se borrará","¿Está seguro?","Si, borrar",function(){
          JournalService.delete(id,Session.id)
            .then(function(msg){
              if(msg === "OK"){
                $scope.journals.splice(index, 1);
                Alert.success("La revista se ha borrado con exito","¡Revista borrada!");
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

    var JournalsCreateCtrl = function ($scope, Session, Alert, JournalService,$location) {
      $scope.journal = {
        session_id: Session.id
      };
      $scope.addJournal = function(form){
        if (!form.$valid){return;}
        JournalService.create($scope.journal)
          .then(function(msg){
            if(msg === "OK"){
              $scope.journal = {};
              Alert.success("La revista se ha creado con exito","¡Revista creada!");
              $location.path( "/revistas" );
            }
            else{
              Alert.error(msg,"¡Error!");
            }
          },function(err){
            Alert.error(err.message,"¡Error!");
          });
      };
    };

    var JournalsDetailsCtrl = function ($scope, Session, Alert, JournalService, $routeParams, $location  ) {
      var id = $routeParams.id;
      $scope.journal = JournalService.journals.filter(function (el) {
        return (el.id === +id);
      })[0];
      $scope.journal.session_id = Session.id;

      $scope.addJournal = function(form){
        if (!form.$valid){return;}
        JournalService.update($scope.journal)
          .then(function(msg){
            if(msg === "OK"){
              Alert.success("La revista se ha actualizado con exito","¡Revista actualizada!");
              $location.path( "/revistas" );
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
      .when('/revistas', {
        templateUrl: 'app/components/journal/journals.html',
        controller: JournalsListCtrl,
        data: {
          authorizedRoles: ["ADMIN"]
        }
      })
      .when('/revistas/crear', {
        templateUrl: 'app/components/journal/journal.html',
        controller: JournalsCreateCtrl,
        data: {
          authorizedRoles: ["ADMIN"]
        }
      })
      .when('/revistas/:id', {
        templateUrl: 'app/components/journal/journal.html',
        controller: JournalsDetailsCtrl,
        data: {
          authorizedRoles: ["ADMIN"]
        }
      });
  });
