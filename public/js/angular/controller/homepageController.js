homepage.controller('HomeController', ['$scope', '$q', 'CanvasProvider', '$rootScope', '$timeout', '$state', function($scope, $q, CanvasProvider, $rootScope, $timeout, $state) {
  var canvases = Parse.Object.extend("canvases");

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
    var requireLogin = toState.data.requireLogin;

    if (requireLogin && Parse.User.current() === null) {
      event.preventDefault();
    }
  })

  $scope.checkUserReg = function() {
    if (Parse.User.current() === null) {
      angular.element('.userRegistrationBox').show();
      $timeout(function() {
        angular.element('.userRegistrationBox').hide()
      }, 1500);
    }
  }

  $scope.addBoard = function(description) {
    var object = new canvases();
    CanvasProvider(object, description);
    $scope.boardDesc = '';
  };

  $scope.setCurrent = function(id) {
    CanvasProvider.setCurrent(id);
  }

  $scope.searchBy = function(type, param) {
    CanvasProvider.searchFor(type, param).then(function(boards) {
      $scope.boards = boards;
    })
  }

  CanvasProvider.fetch().then(function(boards) {
    $scope.boards = boards;
  });

}]);
