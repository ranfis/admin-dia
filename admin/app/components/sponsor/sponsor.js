'use strict';

angular.module('diaApp').service('SponsorService', new GenericService("sponsor"));

angular.module('diaApp').config(
  new GenericController("SponsorService", "Patrocinador", "sponsor", "sponsors")
);
