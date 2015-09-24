describe('ParseCode', function() {

  jasmine.getFixtures().fixturesPath = 'spec/test/fixtures';

  beforeEach(function() {
    loadFixtures('canvasfixture.html');
    $.holdReady(false);
  });

  it('should have an empty alert at the start', function() {
    expect('.save-alert').toContainText('');
  });

  xit('should have the correct alert after saving', function(done) {
    $('.save-canvas').click();
    setTimeout(function() {
      expect($('.save-alert').text()).toContainText('Your drawing has been saved!');
      done();
    }, 3000);

  });

});
