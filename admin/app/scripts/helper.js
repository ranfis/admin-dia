'use strict';

angular.module('diaApp')
  .service('Helper', function (Alert, MESSAGES, Session, $location, PATH, CLASSES, USER_ROLES) {
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
    this.setWSYear = function (date) {
      var newdate = date + "-00-00";
      return newdate.slice(0, 10) || "0000-00-00";
    };
    this.getWSYear = function (date) {
      return +date.slice(0, 4);
    };
    this.checkResult = function (res) {
      if (res.data.msg === "Sesi&oacute;n expirada") {
        Session.destroy();
        //Alert.openModal({
        //  templateUrl: 'app/components/login/login.html'
        //});
        $location.path(PATH.LOGIN);
      }
      if (res.data.msg === "Sesi&oacute;n inv&aacute;lida") {
        Session.destroy();
        $location.path(PATH.LOGIN);
      }
      if (res.data.msg !== MESSAGES.OK && !(res.data.msg === "Sesi&oacute;n inv&aacute;lida")) {
        throw new Error(res.data.msg);
      }
      return res;
    };
    this.handleErrors = function () {
      throw new Error(MESSAGES.ERROR.UNEXPECTED);
    };
    var hide = function () {
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
      $rootScope.$on('$viewContentLoaded', function () {
        hide();
      });
      hide();
    };
    this.isRoleConfidential = function(actualRole) {
      return actualRole==USER_ROLES.SUPER_ADMIN || actualRole==USER_ROLES.ADMINCONF;
    }
    this.isReportOnly = function(actualRole) {
      return actualRole == USER_ROLES.REPORT || actualRole== USER_ROLES.REPORTCONF;
    }

  });
