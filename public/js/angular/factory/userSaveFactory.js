user.factory('SignUpUser', ['$http', function($http) {
  return {
    signUp: function(username, email, password) {
      var user = new Parse.User();
      user.set("username", username);
      user.set("password", password);
      user.set("email", email);

      user.signUp(null, {
        success:function(user){
          console.log("I just saved a user");
        },
        error:function(user, error){
          console.log("didn't work");
        }
      })
    }

  };
}])