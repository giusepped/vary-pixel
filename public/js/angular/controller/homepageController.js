homepage.controller('HomeController', ['$scope', '$q', 'AllCanvas', '$rootScope', '$timeout', function($scope, $q, AllCanvas, $rootScope, $timeout) {
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
    saveToParse(object, description);
    $scope.boardDesc = '';
  };

  $scope.setCurrent = function(id) {
    AllCanvas.setCurrent(id);
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
      AllCanvas.setBoard(boards);
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
      AllCanvas.setBoard(boards);
      $scope.boards = boards;
    });
  }

  $scope.fetchPopular();
}]);
