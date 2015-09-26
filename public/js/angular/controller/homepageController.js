homepage.controller('HomeController', ['$scope', '$q', 'AllCanvas', '$rootScope', function($scope, $q, AllCanvas, $rootScope) {
  var canvases = Parse.Object.extend("canvases");

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams){
    var requireLogin = toState.data.requireLogin;

    if(requireLogin && Parse.User.current() === null) {
      event.preventDefault();
      $('.userRegistrationBox').show();
    }
  })

  function getBoard() {
    var deferred = $q.defer();
    var query = new Parse.Query(canvases);

    query.find({
      success: function(results) {
        deferred.resolve(results);
      },
      error: function(error) {
        deferred.reject(error.message);
      }
    });
    return deferred.promise;
  }

  getBoard().then(function(boards) {
    AllCanvas.setBoard(boards);
    $scope.boards = boards;
  });

  function saveToParse(object, description) {
    object.save({
      picture: null,
      description: description
    }, {
      success: function(canvas) {
        console.log('saved');
        AllCanvas.setCurrent(canvas.id);
      },
      error: function(canvas, error) {
        console.log('failed');
      }
    });
  }

  $scope.addBoard = function(description) {
    var object = new canvases();
    saveToParse(object, $scope.boardDesc);
    $scope.boardDesc = '';
  };

  $scope.setCurrent = function(id) {
    AllCanvas.setCurrent(id);
  }
}]);
