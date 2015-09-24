homepage.controller('HomeController', ['$scope', function($scope) {
  $scope.boards = [];

  $scope.addBoard = function(title) {
    if (title.length > 0) {
      $scope.boards.push({
        'desc': title,
        'edit': false
      });
      $scope.boardDesc = '';
    };
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

  $scope.testParse = function() {
    var canvases = Parse.Object.extend("canvases");
    var canvas = new canvases();

    saveToParse.saving(canvas, $scope.boardDesc);
  };
}]);

var saveToParse = (function() {
  function saving(object, description) {
    object.save({
      picture: null,
      name: description
    }, {
      success: function(canvas) {
        alert('New object created with objectId: ' + canvas.id);
      },
      error: function(canvas, error) {
        alert('Failed to create new object, with error code: ' + error.message);
      }
    })
  }
  return {
    saving: saving
  }
})();
