'use strict';

describe('Service: Helper', function () {
  beforeEach(module('diaApp'));
  var testBadResult = {
    data:{msg:"FAIL"}
  };
  var testGoodResult = {
    data:{msg:"OK"}
  };
  it('cleanURL() should clean incorrect urls', inject(function (Helper) {
    var badUrl1 = "testurl.com";
    var badUrl2 = "testurl.com/";
    var badUrl3 = "http://testurl.com";
    var goodUrl1 = "http://testurl.com/";
    var goodUrl2 = "https://testurl.com/";
    
    var newUrl = Helper.cleanURL(badUrl1);
    expect(newUrl).toEqual(goodUrl1);
    newUrl = Helper.cleanURL(badUrl2);
    expect(newUrl).toEqual(goodUrl1);
    newUrl = Helper.cleanURL(badUrl3);
    expect(newUrl).toEqual(goodUrl1);
    newUrl = Helper.cleanURL(goodUrl2);
    expect(newUrl).toEqual(goodUrl2);
  }));
  it('selectById() should get matching object by id', inject(function (Helper) {
    var list = [{id:1,attr:"First"},{id:2,attr:"Second"},{id:3,attr:"Third"},{id:4,attr:"Fourth"}];
    var matched = Helper.selectById(list,2);
    expect(matched).toEqual(list[1]);
  }));
  it('getIDs() should get an array of ids', inject(function (Helper) {
    var list = [{id:1,attr:"First"},{id:2,attr:"Second"},{id:3,attr:"Third"},{id:4,attr:"Fourth"}];
    var ids = Helper.getIDs(list);
    expect(ids).toEqual([1,2,3,4]);
  }));
  it('checkResult() throws error if message is not OK', inject(function (Helper) {
    expect( function(){
      Helper.checkResult(testBadResult);
    } ).toThrow();
  }));
  it('checkResult() does not throws error if message is OK', inject(function (Helper) {
    expect( function(){
      Helper.checkResult(testGoodResult);
    } ).not.toThrow();
  }));
});
