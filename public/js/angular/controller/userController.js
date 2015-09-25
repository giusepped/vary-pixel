homepage.controller('UserController', ['$scope', function($scope) {

  $scope.username = '';

  $scope.saveUser = function(username, email, password) {
    var user = new Parse.User();
    user.set("username", username);
    user.set("password", password);
    user.set("email", email);
    user.signUp(null, {
      success: function(user) {
        console.log("I just saved a user");
        $scope.cancelNavBar();
      },
      error: function(user) {
        console.log("didn't work");
      }
    }).then(function(user) {
      $scope.username = user.get("username");
      $scope.$apply();
    });
  }

  $scope.signInUser = function(username, password) {
    Parse.User.logIn(username, password, {
      success: function(user) {
        console.log('success');
        $scope.cancelNavBar();
      },
      error: function(user) {
        console.log('error');
      }
    }).then(function(user) {
      $scope.username = user.get("username");
      $scope.$apply();
    });
  }

  $scope.signOutUser = function(username, password) {
    Parse.User.logOut();
    loggedIn = false;
    console.log(loggedIn);
    console.log('I have signed out');
    $scope.username = "Logged out";
    $scope.cancelNavBar();
  }

  // $scope.userAction = function (action) {
  //   console.log(action);
  //   return action;
  // }

  $('.signInButton').click(function() {
    $('.sign-in').toggle();
    $('.sign-up').hide();
    $('.sign-out').hide();
  })
  $('.signUpButton').click(function() {
    $('.sign-up').toggle();
    $('.sign-out').hide();
    $('.sign-in').hide();
  })
  $('.signOutButton').click(function() {
    $('.sign-out').toggle();
    $('.sign-up').hide();
    $('.sign-in').hide();
  })

}]);
