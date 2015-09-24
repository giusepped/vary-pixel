homepage.controller('HomeController', ['$scope', function($scope) {

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

  $scope.editDesc = function(index, newDesc) {
    if (newDesc.length > 0) {
      $scope.boards[index].desc = newDesc;
    };
    $scope.boards[index].edit = false;
  }

  $scope.deleteBoard = function(index) {
    $scope.boards.splice(index, 1);
  }

  $scope.addBoard = function(description) {
    var canvases = Parse.Object.extend("canvases");
    var object = new canvases();
    if (description.length > 0) {
      saveToParse(object, description);
    };
    $scope.boardDesc = ''
  };
}]);
