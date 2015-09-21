describe('Canvas', function() {

  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = './public';
    loadFixtures('canvas.html');
    $.holdReady(false);
  });

  // var canvas = document.getElementsByClassName(".board")[0];

  it('should initialize with a canvas', function() {
    expect("canvas").toExist();
  });
})
