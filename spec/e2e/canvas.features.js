describe('canvaspage', function() {

  beforeEach(function() {
    browser.get('http://0.0.0.0:8080/canvas.html');
  });

  var saveButton = element(by.className('save-canvas'));
  var saveAlert = element(by.className('save-alert'));

  it('saves a canvas', function() {
    saveButton.click();
    expect(saveAlert.getText()).toEqual('Your drawing is saved!');
  });
});