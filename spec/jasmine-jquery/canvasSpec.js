describe('Canvas', function() {
jasmine.getFixtures().fixturesPath = 'public';
  beforeEach(function() {
<<<<<<< HEAD

=======
    jasmine.getFixtures().fixturesPath = '.';
>>>>>>> a054d7b4fe89543464c660475553837d64848cfe
    loadFixtures('canvas.html');
    $.holdReady(false);
  });

  it('should initialize with a canvas', function() {
    expect("canvas").toExist();
  });

});
