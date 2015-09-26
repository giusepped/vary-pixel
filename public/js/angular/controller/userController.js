homepage.controller('UserController', ['$scope', function($scope) {

  $scope.username = '';

  $scope.saveUser = function(username, email, password) {
    var user = new Parse.User();
    user.set("username", username);
    user.set("password", password);
    user.set("email", email);
    user.signUp(null, {
      success: function(user) {
        $scope.userAction('signUp');
        $('.sign-up').hide();
        console.log("I just saved a user");
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
        $scope.userAction('signIn');
        $('.sign-in').hide();
        console.log('success');
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
    $scope.userAction('signOut');
    $('.sign-out').hide();
    console.log('I have signed out');
    $scope.username = "Logged out";
  }

  $scope.userAction = function (action) {
    if (action === 'signIn' || action === 'signUp') {
      $('.signInButton').hide();
      $('.signUpButton').hide();
      $('.signOutButton').show();
    } else if (action === 'signOut') {
      $('.signInButton').show();
      $('.signUpButton').show();
      $('.signOutButton').hide();
    }
  }

  $('.signOutButton').hide();

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
