'use strict';

angular.module('diaApp').service('SponsorService', new GenericService("sponsor"));

angular.module('diaApp').config(
  new GenericController(
    {
      serviceName: "SponsorService",
      name: "Patrocinador",
      entity: "sponsor",
      listName: "sponsors"
    }
  ));
