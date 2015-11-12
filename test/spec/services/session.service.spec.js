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

  it('destroy() should clean object', inject(function (Session) {
    Session.destroy();
    expect(Session.id).toBeNull();
    expect(Session.userEmail).toBeNull();
    expect(Session.userRole).toBeNull();
    expect(Session.name).toBeNull();
  }));
});
