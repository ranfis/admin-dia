'use strict';

angular.module('diaApp').service('CongressService', new GenericService("congress"));

angular.module('diaApp').config(
  new GenericController("CongressService","Congresos","congress","congresses",
    [{service:"SponsorService",list:"sponsors"},{service:"ParticipantService",list:"participants"}])
);

