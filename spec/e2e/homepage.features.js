describe('homepage', function() {

  // beforeEach(function() {
  //   browser.get('http://localhost:3000');
  // });

  var board = element.all(by.repeater('board in boards'));
  var userReg = element(by.css('div.user-reg'));
  var username = element(by.className('username'));
  var signInBtn = element(by.className('signInButton'));
  var signUpBtn = element(by.className('signUpButton'));
  var logOutBtn = element(by.className('logOutButton'));
  var submitBtn = element(by.className('signInSubmit'));
  var submitLogOut = element(by.className('logOutSubmit'));
  var signInUsername = element(by.model('usernameLogIn'));
  var signInPassword = element(by.model('passwordLogIn'));
  var signUpUsername = element(by.model('username'));
  var signUpEmail = element(by.model('email'));
  var signUpPassword = element(by.model('password'));
  var signUpPasswordConfirmation = element(by.model('passwordConfirmation'));
  var submitSignUpBtn = element(by.className('signUpSubmit'));

  it('should have a title', function() {
    browser.get('http://localhost:3000');
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
      expect(userReg.isDisplayed()).toBeFalsy();
    });

    xit('should be able to sign up a user', function(){
      signUpBtn.click();
      signUpUsername.sendKeys('benja');
      signUpEmail.sendKeys('b@test.com');
      signUpPassword.sendKeys('12345');
      signUpPasswordConfirmation.sendKeys('12345');
      submitSignUpBtn.click();
      expect(element(by.className('sign-up')).isDisplayed()).toBe(false);
    });

    xit('should be able to log out a user', function(){
      logOutBtn.click();
      submitLogOut.click();
      expect(element(by.className('sign-out')).isDisplayed()).toBe(false);
    });
  });
});
