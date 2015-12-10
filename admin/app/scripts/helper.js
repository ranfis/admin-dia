'use strict';

angular.module('diaApp')
  .service('Helper', function (Alert,MESSAGES, Session) {
    this.selectById = function(list,id){
      var match = list.filter(function(e){
        return (e.id === +id);
      });
      return match[0] || null;
    };
    this.getIDs = function(list){
      var ids=[];
      list.forEach(function (e) {
        ids.push(e.id);
      });
      return ids;
    };
    this.checkResult = function(res){
      if(res.data.msg === "Sesi&oacute;n expirada"){
        Session.destroy();
        Alert.modal({
          templateUrl: 'app/components/login/login.html'
        });
      }
      if(res.data.msg !== MESSAGES.OK){
        throw new Error(res.data.msg);
      }
      return res;
    };
    this.handleErrors = function(){
      throw new Error(MESSAGES.ERROR.NO_INTERNET);
    };
  })
  .filter('siNo', function() {
    return function(input) {
      return input ? 'Sipi' : 'Nop';
    };
  });
