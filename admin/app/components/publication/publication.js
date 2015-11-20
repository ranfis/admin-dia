'use strict';

var GenericService = GenericService || {};

angular.module('diaApp').service('PublicationService', new GenericService("publication"));

angular.module('diaApp').config(function ($routeProvider) {

  var PublicationsListCtrl = function ($scope, Session,Alert, PublicationService) {
    PublicationService.list(Session.id)
      .then(function (res) {
        $scope.publications = res.data.result;
        PublicationService.publications = $scope.publications;
      }, function(err){
        Alert.error(err.message,"¡Error!");
      });

    $scope.deletePublication = function(id,index){
      Alert.confirm("Esta publicación se borrará","¿Está seguro?","Si, borrar",function(){
        PublicationService.delete(id,Session.id)
          .then(function(msg){
            if(msg === "OK"){
              $scope.publications.splice(index, 1);
              Alert.success("La publicación se ha borrado con exito","¡Publicación borrada!");
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

  var PublicationsCreateCtrl = function ($scope, Session, Alert, journals, participants, PublicationService,$location) {
    $scope.journals = journals.data.result;
    $scope.participants = participants.data.result;
    $scope.publication = {
      session_id: Session.id
    };
    $scope.addPublication = function(form){
      if (!form.$valid){return;}
      PublicationService.create($scope.publication)
        .then(function(msg){
          if(msg === "OK"){
            $scope.publication = {};
            Alert.success("La publicación se ha creado con exito","¡Publicación creada!");
            $location.path( "/publicacion" );
          }
          else{
            Alert.error(msg,"¡Error!");

          }
        },function(err){
          Alert.error(err.message,"¡Error!");
          console.log(result.data);
        });
    };
  };

  var PublicationsDetailsCtrl = function ($scope, Session, Alert, Helper, journals, participants, PublicationService, $routeParams, $location  ) {
    $scope.journals = journals.data.result; // Needed to fill journals select box
    $scope.participants = participants.data.result; // Needed to fill participants select box
    $scope.publication = Helper.selectById(PublicationService.publications, $routeParams.id); // Getting the selected publication from memory
    $scope.publication.session_id = Session.id;
    $scope.publication.participantes = Helper.getIDs($scope.publication.participantes); // Retrieve the actual select value
    $scope.publication.journal = $scope.publication.journal.id; // Retrieve the actual select value
    $scope.addPublication = function(form){
      if (!form.$valid){return;}
      PublicationService.update($scope.publication)
        .then(function (msg) {
          if (msg === "OK") {
            Alert.success("La publicación se ha actualizado con exito","¡Publicación actualizada!");
            $location.path( "/publicacion" );
          }
          else{
            Alert.error(msg,"¡Error!");
          }
        }, function (err) {
          Alert.error(err.message,"¡Error!");
        });
    };
  };

  PublicationsCreateCtrl.resolve = {
    journals: function(JournalService, Session){
      return JournalService.list(Session.id);
    },
    participants: function(ParticipantService, Session){
      return ParticipantService.list(Session.id);
    }
  };

  $routeProvider
    .when('/publicaciones', {
      templateUrl: 'app/components/publication/publications.html',
      controller: PublicationsListCtrl,
      data: {
        authorizedRoles: ["ADMIN"]
      }
    })
    .when('/publicaciones/crear', {
      templateUrl: 'app/components/publication/publication.html',
      controller: PublicationsCreateCtrl,
      resolve: PublicationsCreateCtrl.resolve,
      data: {
        authorizedRoles: ["ADMIN"]
      }
    })
    .when('/publicaciones/:id', {
      templateUrl: 'app/components/publication/publication.html',
      controller: PublicationsDetailsCtrl,
      resolve: PublicationsCreateCtrl.resolve,
      data: {
        authorizedRoles: ["ADMIN"]
      }
    });
});
