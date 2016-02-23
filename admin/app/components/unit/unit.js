'use strict';

angular.module('diaApp').service('UnitService', new GenericService("executing_unit"));

angular.module('diaApp').config(
  new GenericController(
    {
      serviceName: "UnitService",
      name: "Unidad",
      entity: "unit",
      listName: "units"
    }
  ));

