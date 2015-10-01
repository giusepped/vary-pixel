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
<<<<<<< HEAD
      success:function(user){
        console.log('signed up');
=======
      success: function(user) {
        $scope.userAction('completed');
        $scope.toggleButton();
>>>>>>> 26cb6c28ee77d0858e3579152be3f0196f127cf2
      },
      error: function(user) {
        angular.element('.invalidSignUp').show();
        $timeout(function() {
          angular.element('.invalidSignUp').hide()
        }, 2000);
      }
    }).then(function(user) {
      $scope.setUsername();
      $scope.$apply();
    });
  } else {
    angular.element('.passwordUnmatch').show();
    $timeout(function() {
      angular.element('.passwordUnmatch').hide()
    }, 2000);
    }
  }

  $scope.signInUser = function(username, password) {
    Parse.User.logIn(username, password, {
      success: function(user) {
        $scope.userAction('completed');
        $scope.toggleButton();
      },
      error: function(user) {
        angular.element('.invalidLogin').show();
        $timeout(function() {
          angular.element('.invalidLogin').hide()
        }, 2000);
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

<<<<<<< HEAD
  function toggleUserReg(username) {
    if(username === "Logged in") {
=======
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
>>>>>>> 26cb6c28ee77d0858e3579152be3f0196f127cf2

    }
  }
}]);
