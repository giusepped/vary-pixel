homepage.controller('UserController', ['$scope', function($scope) {

  $scope.saveUser = function(username, email, password) {
    var user = new Parse.User();
    user.set("username", username);
    user.set("password", password);
    user.set("email", email);

    user.signUp(null, {
      success: function(user) {
        console.log("I just saved a user");
      },
      error: function(user) {
        console.log("didn't work");
      }
    })
  }

  $scope.signInUser = function(username, password) {
    Parse.User.logIn(username, password, {
      success: function(user) {
        console.log('I have signed in');
      },
      error: function(user) {
        console.log('error');
      }
    });
  }

  // $('.logInBtn').click(function() {
  //   $('.user-reg login').show()
  // })


  $scope.signOutUser = function(username, password) {
    Parse.User.logOut();
    loggedIn = false;
    console.log(loggedIn);
    console.log('I have signed out');
  }


}]);
