'use strict';

angular.module('diaApp').service('ParticipantService', new GenericService("participant"));

angular.module('diaApp').config(
  new GenericController(
    {
      serviceName: "ParticipantService",
      name: "Participante",
      entity: "participant",
      listName: "participants"
    }
  ));
