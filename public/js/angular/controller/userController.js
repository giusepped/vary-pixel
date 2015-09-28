homepage.controller('UserController', ['$scope', function($scope) {

  $scope.username;
  $scope.userActionChoice;
  $scope.isLoggedIn;

  $scope.test = function() {
    console.log(Parse.User.current());
  }

  $scope.saveUser = function(username, email, password) {
    var user = new Parse.User();
    user.set("username", username);
    user.set("password", password);
    user.set("email", email);
    user.signUp(null, {
      success: function(user) {
        $scope.userAction('completed');
        $scope.toggleButton();
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
        $scope.userAction('completed');
        $scope.toggleButton();
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
    $scope.userAction('log out completed');
    $scope.username = "Logged out";
    $scope.toggleButton();
  }

  $scope.userAction = function(action) {
    if ($scope.userActionChoice === action) {
      $('.user-action').toggle();
    } else if (action === 'completed' || action === 'log out completed') {
      $('.user-action').hide();
      $scope.isLoggedIn = action;
    } else {
      $scope.userActionChoice = action;
      $('.user-action').show();
    };
  }

  $scope.toggleButton = function() {
    if (Parse.User.current() !== null) {
      $('.signInButton').hide();
      $('.signUpButton').hide();
      $('.signOutButton').show();
    } else {
      $('.signInButton').show();
      $('.signUpButton').show();
      $('.signOutButton').hide();
    }
  }

  $scope.setUsername = function() {
    if (Parse.User.current() !== null) {
      $scope.username = Parse.User.current().get("username");
    }
    else {
      $scope.username = "";
    }
  }
  $scope.toggleButton();
  $scope.setUsername();

}]);
