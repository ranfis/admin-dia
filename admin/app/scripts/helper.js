'use strict';

angular.module('diaApp')
  .service('Helper', function (Alert,MESSAGES, Session,$location,PATH) {
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
    this.cleanURL = function(url){
	    var newUrl = url;
	    if(newUrl.indexOf("http")!==0){
		    newUrl = "http://"+newUrl;
	    }
	    var last = newUrl[newUrl.length-1];
	    if(last!=="/"){
		    newUrl = newUrl+"/";
	    }
	    return newUrl;
    };
    this.setWSYear = function(date){
      var newdate = date+"-00-00";
      return newdate.slice(0,10) || "0000-00-00";
    };
    this.getWSYear = function(date){
      return +date.slice(0,4);
    };
    this.checkResult = function(res){
      if(res.data.msg === "Sesi&oacute;n expirada"){
        Session.destroy();
        Alert.openModal({
          templateUrl: 'app/components/login/login.html'
        });
        $location.path( PATH.LOGIN );
      }
      if(res.data.msg !== MESSAGES.OK){
        throw new Error(res.data.msg);
      }
      return res;
    };
    this.handleErrors = function(){
      throw new Error(MESSAGES.ERROR.UNEXPECTED);
    };
  });
