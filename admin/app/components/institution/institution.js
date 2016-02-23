'use strict';

angular.module('diaApp').service('InstitutionService', new GenericService("institution"));

angular.module('diaApp').config(
  new GenericController({
    serviceName: "InstitutionService",
    name: "Institucion",
    entity: "institution",
    listName: "institutions"
  })
);



