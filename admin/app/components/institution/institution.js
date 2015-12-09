'use strict';

angular.module('diaApp').service('InstitutionService', new GenericService("institution"));

angular.module('diaApp').config(
  new GenericController("InstitutionService","Institucion","institution","institutions")
);
