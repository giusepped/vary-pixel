describe('homepage', function() {

  beforeEach(function() {
    browser.get('http://localhost:3000');
  });

  var board = element.all(by.repeater('board in boards'));
  var signInBtn = element(by.className('logInButton'));
  var signUpBtn = element(by.className('signUpButton'));
  var logOutBtn = element(by.className('logOutButton'));

  // var addBoardBtn = element(by.className('addBoardBtn'));
  // var boardTitle = element(by.model('boardDesc'));
  // var newDesc = element(by.model('newDescValue'));
  // var newDescBtn = element(by.className('newDescSubmit'));
  // var editBtn = element(by.className('newDescBtn'));
  // var delBtn = element(by.className('boardDelBtn'));

  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('Vary Pixel');
  });

  describe('user registration', function() {
    it('should have a log in feature', function() {
      element(by.className('logInButton')).click();
      expect(element(by.className('sign-in')).isDisplayed()).toBe(true);
    });
  });
  // xit('should have list of all boards', function() {
  //   boardTitle.sendKeys('test');
  //   addBoardBtn.click();
  //   expect(board.get(0).getText()).toContain('test');
  // });

  // xit('edit a board desc', function () {
  //   boardTitle.sendKeys('test');
  //   addBoardBtn.click();
  //   editBtn.click();
  //   newDesc.sendKeys('test2');
  //   newDescBtn.click();
  //   expect(board.get(0).getText()).toContain('test2')
  // });

  // xit('can delete a board', function () {
  //   boardTitle.sendKeys('test');
  //   addBoardBtn.click();
  //   editBtn.click();
  //   delBtn.click();
  //   expect(board.length).toBeUndefined();
  // });
});
