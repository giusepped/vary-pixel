describe('Canvas', function() {

  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = './public';
    loadFixtures('canvas.html');
    $.holdReady(false);
  });

  it('should initialize with a canvas', function() {
    expect("canvas").toExist();
  });

});
