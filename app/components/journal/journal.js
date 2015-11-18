'use strict';

angular.module('diaApp').service('JournalService', new GenericService("journal"));

angular.module('diaApp')
  .config(function ($routeProvider) {

    var JournalsListCtrl = function ($scope, Session, JournalService) {
      JournalService.list(Session.id)
        .then(function (res) {
          $scope.journals = res.data.result;
          JournalService.journals = $scope.journals;
        }, function(err){
          show.error(err.message,"¡Error!");
        });

      $scope.deleteJournal = function(id,index){
        show.confirm("Este revista se borrará","¿Está seguro?","Si, borrar",function(){
          JournalService.delete(id,Session.id)
            .then(function (ok) {
              if (ok) {
                $scope.journals.splice(index, 1);
                show.success("La revista se ha borrado con exito","¡Revista borrada!");
              }
            }, function (err) {
              show.error(err.message,"¡Error!");
            });
        });
      }
    };

    var JournalsCreateCtrl = function ($scope, Session, JournalService,$location) {
      $scope.journal = {
        session_id: Session.id
      };
      $scope.addJournal = function(form){
        if (!form.$valid) return;
        JournalService.create($scope.journal)
          .then(function(ok){
            if(ok){
              $scope.journal = {};
              show.success("La revista se ha creado con exito","¡Revista creada!");
              $location.path( "/revistas" );
            }
          },function(err){
            show.error(err.message,"¡Error!");
          });
      };
    };

    var JournalsDetailsCtrl = function ($scope, Session, JournalService, $routeParams, $location  ) {
      var id = $routeParams.id;
      $scope.journal = JournalService.journals.filter(function (el) {
        return (el.id === +id);
      })[0];
      $scope.journal.session_id = Session.id;

      $scope.addJournal = function(form){
        if (!form.$valid) return;
        JournalService.update($scope.journal)
          .then(function (ok) {
            if (ok) {
              show.success("La revista se ha actualizado con exito","¡Revista actualizada!");
              $location.path( "/revistas" );
            }
          }, function (err) {
            show.error(err.message,"¡Error!");
          });
      }
    };

    $routeProvider
      .when('/revistas', {
        templateUrl: 'components/journal/journals.html',
        controller: JournalsListCtrl,
        data: {
          authorizedRoles: ["ADMIN"]
        }
      })
      .when('/revistas/crear', {
        templateUrl: 'components/journal/journal.html',
        controller: JournalsCreateCtrl,
        data: {
          authorizedRoles: ["ADMIN"]
        }
      })
      .when('/revistas/:id', {
        templateUrl: 'components/journal/journal.html',
        controller: JournalsDetailsCtrl,
        data: {
          authorizedRoles: ["ADMIN"]
        }
      });
  });
