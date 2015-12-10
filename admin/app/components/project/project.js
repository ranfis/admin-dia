'use strict';

angular.module('diaApp').service('ProjectService', new GenericService("project"));

angular.module('diaApp').config(
  new GenericController("ProjectService","Proyectos","project","projects",
    [{service:"FundService",list:"funds"},{service:"ParticipantService",list:"participants"}])
);
