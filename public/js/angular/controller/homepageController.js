homepage.controller('HomeController', ['$scope', '$q', function($scope, $q) {

  var canvases = Parse.Object.extend("canvases");

  function getBoards() {
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

  getBoards();
  var promise = getBoards();
  promise.then(function(boards) {
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
    if (description.length > 0) {
      saveToParse(object, description);
    };
    $scope.boardDesc = ''
  };
}]);
