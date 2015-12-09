'use strict';

angular.module('diaApp').service('FundService', new GenericService("fund"));

angular.module('diaApp').config(
  new GenericController("FundService","Fondo","fund","funds")
);
