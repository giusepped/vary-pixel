describe('Canvas', function() {
jasmine.getFixtures().fixturesPath = 'public';
  beforeEach(function() {

    loadFixtures('canvas.html');
    $.holdReady(false);
  });

  it('should initialize with a canvas', function() {
    expect("canvas").toExist();
  });

});
