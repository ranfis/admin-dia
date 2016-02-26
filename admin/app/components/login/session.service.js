'use strict';

angular.module('diaApp').service('Session', function () {
  this.create = function (user) {
    this.id = user.sessionId;
    this._id = user.id;
    this.userEmail = user.correo;
    this.userRole = user.rol.name;
    this.name = user.nombre_completo;
    this.store(user);
    return this;
  };
  this.restore = function(){
    if(sessionStorage.diaUser){
      var user = JSON.parse(sessionStorage.diaUser);
      this.create(user);
      return user;
    }
    else{
      return false;
    }
  };
  this.destroy = function () {
    this.id = null;
    this._id = null;
    this.userEmail = null;
    this.userRole = null;
    this.name = null;
    this.remove();
  };
  this.store = function(user){
      sessionStorage.diaUser = JSON.stringify(user);
  };
  this.remove = function(){
    delete sessionStorage.diaUser;
  };
/*  this.store = function(key,value){
    if(typeof value === 'string' || value instanceof String){
      sessionStorage[key] = value;
    }
    else{
      sessionStorage[key] = JSON.stringify(value);
    }
  };
  this.get = function(key){
    var value = sessionStorage[key];
    try{
      value = JSON.parse(value);
    }
    catch(err){

    }
    return value;
  };*/
});
