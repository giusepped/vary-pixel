describe('Canvas', function() {
jasmine.getFixtures().fixturesPath = 'spec/test/fixtures';
  beforeEach(function() {
    loadFixtures('canvasfixture.html');
    $.holdReady(false);
  });

  it('should initialize with a canvas', function() {
    expect("canvas").toExist();
  });

});
