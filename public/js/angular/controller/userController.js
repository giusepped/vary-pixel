homepage.controller('UserController', ['$scope', function($scope) {

  var self = this;
  $scope.username = '';

  $scope.saveUser = function(username, email, password) {
    var user = new Parse.User();
    user.set("username", username);
    user.set("password", password);
    user.set("email", email);
    user.signUp(null, {
      success:function(user){
        $scope.username = user.get("username");
        console.log($scope.username);
      },
      error:function(user){
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
    $scope.username = "Logged out";
    console.log($scope.username);
  }

  $scope.currentUser = {
    name: $scope.username
  }

}]);
