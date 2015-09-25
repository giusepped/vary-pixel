describe('homepage', function() {

  beforeEach(function() {
    browser.get('http://localhost:3000');
  });

  var board = element.all(by.repeater('board in boards'));
  var signInBtn = element(by.className('logInButton'));
  var signUpBtn = element(by.className('signUpButton'));
  var logOutBtn = element(by.className('logOutButton'));
  var submitBtn = element(by.className('signInSubmit'));
  var submitLogOut = element(by.className('logOutSubmit'));
  var signInUsername = element(by.model('usernameLogIn'));
  var signInPassword = element(by.model('passwordLogIn'));
  var signUpusername = element(by.model('username'));
  var signUpEmail = element(by.model('email'));
  var signUpPassword = element(by.model('password'));
  var signUpPasswordConfirmation = element(by.model('passwordConfirmation'));
  var submitSignUpBtn = element(by.className('signUpSubmit'));

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
      signInBtn.click();
      expect(element(by.className('sign-in')).isDisplayed()).toBe(true);
    });

    it('should be able to log in a user', function(){
      signInBtn.click();
      signInUsername.sendKeys('bex');
      signInPassword.sendKeys('12345678');
      submitBtn.click();
      expect(element(by.className('sign-in')).isDisplayed()).toBe(false);
    });

    it('should be able to sign up a user', function(){
      signUpBtn.click();
      signUpusername.sendKeys('benja');
      signUpEmail.sendKeys('b@test.com');
      signUpPassword.sendKeys('12345');
      signUpPasswordConfirmation.sendKeys('12345');
      submitSignUpBtn.click();
      expect(element(by.className('sign-up')).isDisplayed()).toBe(false);
    });

    it('should be able to log out a user', function(){
      logOutBtn.click();
      submitLogOut.click();
      expect(element(by.className('sign-out')).isDisplayed()).toBe(false);
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
