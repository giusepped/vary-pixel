describe('ParseCode', function() {

// jasmine.getFixtures().fixturesPath = 'spec/test/fixtures';

  beforeEach(function() {
<<<<<<< HEAD
    loadFixtures('canvas.html');
  $.holdReady(false);
=======
    jasmine.getFixtures().fixturesPath = '.';
    loadFixtures('./canvas.html');
    $.holdReady(false);
>>>>>>> a054d7b4fe89543464c660475553837d64848cfe
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
<<<<<<< HEAD
    }, 1000);
  //expect('.save-alert').toContainText('hello world');

=======
    }, 500);
>>>>>>> a054d7b4fe89543464c660475553837d64848cfe
  });

});
