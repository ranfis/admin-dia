'use strict';

angular.module('diaApp')
  .service('Helper', function (Alert, MESSAGES, Session, $location, PATH, CLASSES) {
    this.selectById = function (list, id) {
      var match = list.filter(function (e) {
        return (e.id === +id);
      });
      return match[0] || null;
    };
    this.getIDs = function (list) {
      var ids = [];
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
    this.getWSYear = function (date) {
      return +date.slice(0, 4);
    };
    this.checkResult = function (res) {
      if (res.data.msg === "Sesi&oacute;n expirada") {
        Session.destroy();
        Alert.openModal({
          templateUrl: 'app/components/login/login.html'
        });
        $location.path(PATH.LOGIN);
      }
      if (res.data.msg !== MESSAGES.OK) {
        throw new Error(res.data.msg);
      }
      return res;
    };
    this.handleErrors = function () {
      throw new Error(MESSAGES.ERROR.UNEXPECTED);
    };
    this.setSidebarVisibility = function (value, value2) {
      document.getElementById(CLASSES.NO_REPORT).style.display = value;
      document.getElementById(CLASSES.NO_USER).style.display = value2;
    };


    var hide = function (scope) {
      if (Session.userRole == "REPORT") {
        //$( ".sidebar-group" ).not( ".report-buttons" ).remove();
        $(".sidebar-group.report-buttons").show();
        $(".sidebar-group").not(".report-buttons").hide();
      } else if (Session.userRole == "ADMIN") {
        //$( ".sidebar-group" ).not( ".admin-buttons" ).remove();
        $(".sidebar-group.admin-buttons").show();
        $(".sidebar-group").not(".admin-buttons").hide();
      } else if (Session.userRole == "SUPER-ADMIN") {
        //$( ".sidebar-group" ).not( ".super-admin-buttons" ).remove();
        $(".sidebar-group.super-admin-buttons").show();
        $(".sidebar-group").not(".super-admin-buttons").hide();
      }
      else {
        $(".sidebar-group").hide();
      }
    };


    this.hideSidebarButtons = function ($rootScope) {
      console.log("hideSidebarButtons");
      $rootScope.$on('$viewContentLoaded', function () {
        hide();
      });
      hide();
    };


  });
