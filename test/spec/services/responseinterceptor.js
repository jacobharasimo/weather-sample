'use strict';

describe('Service: responseInterceptor', function () {

  // load the service's module
  beforeEach(module('weatherApp'));

  // instantiate service
  var responseInterceptor;
  beforeEach(inject(function (_responseInterceptor_) {
    responseInterceptor = _responseInterceptor_;
  }));

  it('should do something', function () {
    expect(!!responseInterceptor).toBe(true);
  });

});
