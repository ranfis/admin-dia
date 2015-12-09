'use strict';

angular.module('diaApp').service('ParticipantService', new GenericService("participant"));

angular.module('diaApp').config(
  new GenericController("ParticipantService", "Participante", "participant", "participants")
);
