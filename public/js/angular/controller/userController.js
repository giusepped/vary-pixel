homepage.controller('UserController', ['$scope', '$timeout', function($scope, $timeout) {

  $scope.username;
  $scope.userActionChoice;
  $scope.isLoggedIn;

  $scope.saveUser = function(username, email, password, rePassword) {
    var user = new Parse.User();
    if(password.match(rePassword)){
      user.set("username", username);
      user.set("password", password);
      user.set("email", email);
      user.signUp(null, {
        success: function(user) {
          $scope.userAction('completed');
          $scope.toggleButton();
        },
        error: function(error) {
          flashElementMessage('.invalidSignUp');
        }
      }).then(function(user) {
        $scope.setUsername();
        $scope.$apply();
      });
    }
    else {
      flashElementMessage('.passwordUnmatch');
    }
  }

  $scope.signInUser = function(username, password) {
    Parse.User.logIn(username, password, {
      success: function(user) {
        $scope.userAction('completed');
        $scope.toggleButton();
      },
      error: function(user) {
        flashElementMessage('.invalidLogin');
      }
    }).then(function(user) {
      $scope.setUsername();
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
      $('.makenew').show();

    } else {
      $('.signInButton').show();
      $('.signUpButton').show();
      $('.signOutButton').hide();
      $('.makenew').hide();
    }
  }

  $scope.setUsername = function() {
    if (Parse.User.current() !== null) {
      $scope.username = "Have fun " + Parse.User.current().get("username") + "!";
    }
    else {
      $scope.username = "";
    }
  }
  $scope.toggleButton();
  $scope.setUsername();

  function flashElementMessage(HTMLelement) {
    angular.element(HTMLelement).show();
    $timeout(function() {
      angular.element(HTMLelement).hide()
    }, 2000);
  }
}]);
