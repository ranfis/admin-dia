'use strict';

describe('Helper', function () {

  it('selectById() should get matching object by id', function () {
    var list = [{id:1,attr:"First"},{id:2,attr:"Second"},{id:3,attr:"Third"},{id:4,attr:"Fourth"}];
    var matched = Helper.selectById(list,2);
    expect(matched).toEqual(list[1]);
  });

  it('getIDs() should get an array of ids', function () {
    var list = [{id:1,attr:"First"},{id:2,attr:"Second"},{id:3,attr:"Third"},{id:4,attr:"Fourth"}];
    var ids = Helper.getIDs(list);
    expect(ids).toEqual([1,2,3,4]);
  });

});
