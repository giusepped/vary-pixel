describe('homepage', function () {

  beforeEach(function() {
    browser.get('http://0.0.0.0:8080');
  });

  it('should have a title', function () {
    expect(browser.getTitle()).toEqual('Vary Pixel');
  });

  it('should have list of all boards', function () {
    
  });
});
