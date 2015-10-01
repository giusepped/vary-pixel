homepage.controller('HomeController', ['$scope', '$q', 'CanvasProvider', '$rootScope', '$timeout', '$state', function($scope, $q, CanvasProvider, $rootScope, $timeout, $state) {
  var canvases = Parse.Object.extend("canvases");

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
    var requireLogin = toState.data.requireLogin;

    if (requireLogin && Parse.User.current() === null) {
      event.preventDefault();
    }
  })

  CanvasProvider.fetch().then(function(results) {
    $scope.boards = results;
  });

  $scope.checkUserReg = function() {
    if (Parse.User.current() === null) {
      angular.element('.userRegistrationBox').show();
      $timeout(function() {
        angular.element('.userRegistrationBox').hide()
      }, 2000);
    }
  }

  $scope.addBoard = function(description) {
    var object = new canvases();
    CanvasProvider.createCanvas(object, description);
    $scope.boardDesc = '';
  };

  $scope.setCurrent = function(id, description) {
    CanvasProvider.setCurrent(id, description);
  }

  $scope.searchBy = function(type, param) {
    CanvasProvider.searchBy(type, param).then(function(results) {
      $scope.boards = results;
    })
  }

  $scope.showContributors = function(id) {
    CanvasProvider.getContributors(id).then(function(results) {
      var cap = 6;
<<<<<<< HEAD
      $scope.contributors = results.reverse();
      if (results.length < 6) { cap = results.length; }
=======
      $scope.contributors = results;
      if (results.length < 6) {
        cap = results.length;
      }
>>>>>>> 5b990c9ac37cc9069342a71c6a2d5bfd6021401c
      for (var i = 0; i < cap; i++) {
        angular.element('.contributors').append(angular.element('<li>').text($scope.contributors[i].get("username")));
      }
    });
  }

  $scope.clearContributors = function() {
    angular.element('.contributors').empty();
    $scope.contributors = [];
  }

}]);
