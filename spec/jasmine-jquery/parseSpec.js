describe('ParseCode', function() {

  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = './public';
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
    console.log($('.save-canvas')[0]);
    setTimeout(function() {
      expect('.save-alert').toContainText('hello world');

      done();
    }, 3000);
  //expect('.save-alert').toContainText('hello world');

  });

});
