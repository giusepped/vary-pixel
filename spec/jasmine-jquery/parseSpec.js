describe('ParseCode', function() {

// jasmine.getFixtures().fixturesPath = 'spec/test/fixtures';

  beforeEach(function() {
    loadFixtures('canvas.html');
  $.holdReady(false);
  });

  it('should have an empty alert at the start', function() {
    expect('.save-alert').toContainText('');
  });

  it('should display a message when a canvas is saved', function(done) {
    //var canvas = new canvases();
    //spyOn(canvas, 'save');
    $('.save-canvas').click();
    setTimeout(function() {
      expect('.save-alert').toContainText('hello world');

      done();
    }, 1000);
  //expect('.save-alert').toContainText('hello world');

  });

});
