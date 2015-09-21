describe('homepage', function() {

  beforeEach(function() {
    browser.get('http://0.0.0.0:8080');
  });

  var board = element.all(by.repeater('board in boards'));
  var addBoardBtn = element(by.className('addBoardBtn'));
  var boardTitle = element(by.model('boardTitleValue'));

  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('Vary Pixel');
  });

  it('should have list of all boards', function() {
    boardTitle.sendKeys('test');
    addBoardBtn.click();
    expect(board.get(0).getText()).toEqual('test');
  });
});
