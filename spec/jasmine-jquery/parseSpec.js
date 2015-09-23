describe('ParseCode', function() {

  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = '.';
    loadFixtures('./canvas.html');
    $.holdReady(false);
  });

  it('should have an empty alert at the start', function() {
    expect('.save-alert').toContainText('');
  });

  xit('should have the correct alert after saving', function(done) {
    $('.save-canvas').click();
    setTimeout(function() {
      window.jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
      expect($('.save-alert').html()).toContainText('Your drawing has been saved!');
      done();
    }, 500);
  });

});
