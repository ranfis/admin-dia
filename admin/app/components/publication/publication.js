'use strict';

angular.module('diaApp').service('PublicationService', new GenericService("publication"));

angular.module('diaApp').config(
  new GenericController("PublicationService","Publicaciones","publication","publications",
    [{service:"JournalService",list:"journals"},{service:"ParticipantService",list:"participants"}])
);
