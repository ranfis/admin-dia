'use strict';

angular.module('diaApp').service('JournalService', new GenericService("journal"));

angular.module('diaApp').config(
  new GenericController(
    {
      serviceName: "JournalService",
      name: "Revista",
      entity: "journal",
      listName: "journals"
    }
  ));
