'use strict';

angular.module('diaApp').service('FundService', new GenericService("fund"));

angular.module('diaApp').config(
  new GenericController({
    serviceName: "FundService",
    name: "Fondo",
    entity: "fund",
    listName: "funds"
  })
);
