'use strict';

describe('Service: Session', function () {
  beforeEach(module('diaApp'));

  it('create() should set properties', inject(function (Session) {
    var user = {
      sessionId: "sessionId",
      email: "email",
      role: {
        name:"role.name"
      },
      nombre_completo: "nombre_completo"
    };
    Session.create(user);
    expect(Session.id).toBe(user.sessionId);
    expect(Session.userEmail).toBe(user.email);
    expect(Session.userRole).toBe(user.role.name);
    expect(Session.name).toBe(user.nombre_completo);
  }));

  it('store() should store to sessionStorage', inject(function (Session) {
    var user = {
      sessionId: "sessionId",
      email: "email",
      role: {
        name:"role.name"
      },
      nombre_completo: "nombre_completo"
    };
    Session.store(user);
    expect(sessionStorage.diaUser).toBe(JSON.stringify(user));
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
    var user = {
      sessionId: "sessionId",
      email: "email",
      role: {
        name:"role.name"
      },
      nombre_completo: "nombre_completo"
    };
    sessionStorage.diaUser = JSON.stringify(user);
    Session.restore();
    expect(Session.id).toBe(user.sessionId);
    expect(Session.userEmail).toBe(user.email);
    expect(Session.userRole).toBe(user.role.name);
    expect(Session.name).toBe(user.nombre_completo);
  }));

  it('destroy() should clean object', inject(function (Session) {
    Session.destroy();
    expect(Session.id).toBeNull();
    expect(Session.userEmail).toBeNull();
    expect(Session.userRole).toBeNull();
    expect(Session.name).toBeNull();
  }));
});
