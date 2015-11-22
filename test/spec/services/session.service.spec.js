'use strict';

describe('Service: Session', function () {
  beforeEach(module('diaApp'));

  afterEach(function(){
    sessionStorage.diaUser = undefined;
  });

  var testUser = {
    sessionId: "sessionId",
    email: "email",
    role: {
      name:"role.name"
    },
    nombre_completo: "nombre_completo"
  };

  it('create() should set properties', inject(function (Session) {
    spyOn(Session, 'store');
    Session.create(testUser);
    expect(Session.id).toBe(testUser.sessionId);
    expect(Session.userEmail).toBe(testUser.email);
    expect(Session.userRole).toBe(testUser.role.name);
    expect(Session.name).toBe(testUser.nombre_completo);
    expect(Session.store).toHaveBeenCalledWith(testUser);
  }));

  it('store() should store to sessionStorage', inject(function (Session) {
    Session.store(testUser);
    expect(sessionStorage.diaUser).toBe(JSON.stringify(testUser));
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

  it('restore() should get user from cookies', inject(function (Session) {
    sessionStorage.diaUser = JSON.stringify(testUser);
    Session.restore();
    expect(Session.id).toBe(testUser.sessionId);
    expect(Session.userEmail).toBe(testUser.email);
    expect(Session.userRole).toBe(testUser.role.name);
    expect(Session.name).toBe(testUser.nombre_completo);
  }));

  it('destroy() should clean object', inject(function (Session) {
    Session.destroy();
    expect(Session.id).toBeNull();
    expect(Session.userEmail).toBeNull();
    expect(Session.userRole).toBeNull();
    expect(Session.name).toBeNull();
  }));
});
