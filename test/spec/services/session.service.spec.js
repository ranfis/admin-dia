'use strict';

describe('Service: Session', function () {
  beforeEach(module('diaApp'));

  afterEach(function(){
    sessionStorage.diaUser = undefined;
  });

  var testUser = {
    sessionId: "sessionId",
    correo: "correo",
    rol: {
      name:"rol.name"
    },
    nombre_completo: "nombre_completo"
  };

  var testUserString = JSON.stringify(testUser);

  it('create() should set properties', inject(function (Session) {
    spyOn(Session, 'store');
    Session.create(testUser);
    expect(Session.id).toBe(testUser.sessionId);
    expect(Session.userEmail).toBe(testUser.correo);
    expect(Session.userRole).toBe(testUser.rol.name);
    expect(Session.name).toBe(testUser.nombre_completo);
    expect(Session.store).toHaveBeenCalledWith(testUser);
  }));

  it('store() should store to Session Storage', inject(function (Session) {
    Session.store(testUser);
    expect(sessionStorage.diaUser).toBe(testUserString);
  }));
  it('remove() should remove to Session Storage', inject(function (Session) {
    sessionStorage.diaUser = testUserString;
    expect(sessionStorage.diaUser).toEqual(testUserString);
    Session.remove();
    expect(sessionStorage.diaUser).toBeUndefined();
  }));

/*  it('get() should get from sessionStorage', inject(function (Session) {
    var key = "foo";
    var value = {foo:"bar"};
    Session.store(key,value);
    var result = Session.get(key);
    expect(result).toEqual(value);
    Session.store(key,key);
    result = Session.get(key);
    expect(result).toBe(key);
  }));*/

  it('restore() should get user from Session Storage', inject(function (Session) {
    sessionStorage.diaUser = testUserString;
    Session.restore();
    expect(Session.id).toBe(testUser.sessionId);
    expect(Session.userEmail).toBe(testUser.correo);
    expect(Session.userRole).toBe(testUser.rol.name);
    expect(Session.name).toBe(testUser.nombre_completo);
  }));

  it('destroy() should clean object and remove Session Storage', inject(function (Session) {
    spyOn(Session, 'remove');
    Session.destroy();
    expect(Session.id).toBeNull();
    expect(Session.userEmail).toBeNull();
    expect(Session.userRole).toBeNull();
    expect(Session.name).toBeNull();
    expect(Session.remove).toHaveBeenCalled();
  }));
});
