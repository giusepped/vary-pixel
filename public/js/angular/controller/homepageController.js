homepage.controller('HomeController', ['$scope', '$q', 'CanvasProvider', '$rootScope', '$timeout', '$state', function($scope, $q, CanvasProvider, $rootScope, $timeout, $state) {
  var canvases = Parse.Object.extend("canvases");

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams){
    var requireLogin = toState.data.requireLogin;

    if(requireLogin && Parse.User.current() === null) {
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

  function saveToParse(object, description) {
    var blankCanvas = document.createElement('canvas');
    var base64 = blankCanvas.toDataURL('image/png');
    object.save({
      Base64: base64,
      description: description
    }, {
      success: function(canvas) {
        console.log('saved');
        CanvasProvider.setCurrent(canvas.id);
        $state.go('canvas', {});

      },
      error: function(canvas, error) {
        console.log('failed');
      }
    });
  }

  $scope.addBoard = function(description) {
    var object = new canvases();
    saveToParse(object, description);
    $scope.boardDesc = '';
  };

  $scope.setCurrent = function(id) {
    CanvasProvider.setCurrent(id);
  }

  $scope.fetchPopular = function() {
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
      $scope.boards = boards;
    });
  }

  $scope.search = function (description) {
    function getBoard() {
      var deferred = $q.defer();
      var query = new Parse.Query(canvases);
      query.startsWith("description", description)
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
      $scope.boards = boards;
    })
  }
  $scope.fetchPopular();

}]);
