'use strict';

angular.module('diaApp').service('JournalService', new GenericService("journal"));

angular.module('diaApp').config(
  new GenericController("JournalService","Revista","journal","journals")
);
