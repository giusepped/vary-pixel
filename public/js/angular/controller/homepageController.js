homepage.controller('HomeController', ['$scope', '$q', 'AllCanvas', function($scope, $q, AllCanvas) {
  var canvases = Parse.Object.extend("canvases");

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
      name: description
    }, {
      success: function(canvas) {
        console.log('saved');
      },
      error: function(canvas, error) {
        console.log('failed');
      }
    });
  }

  $scope.addBoard = function(description) {
    var object = new canvases();
    saveToParse(object, description);
    $scope.boardDesc = ''
  };

  $scope.setCurrent = function(id) {
    AllCanvas.setCurrent(id);
  }
}]);
