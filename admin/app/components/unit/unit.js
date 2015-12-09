'use strict';

angular.module('diaApp').service('UnitService', new GenericService("executing_unit"));

angular.module('diaApp').config(
  new GenericController("UnitService","Unidad","unit","units")
);
