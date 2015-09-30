homepage.factory('CanvasProvider', ['$q', '$state', function($q, $state) {
  var currentID = [];
  var contributors = [];

  var setCurrent = function(id, description) {
    currentID = [id, description];
  }

  var getCurrent = function() {
    return currentID;
  }

  var fetch = function() {
    var deferred = $q.defer();
    var query = new Parse.Query('canvases');
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

  var searchBy = function(type, param) {
    var deferred = $q.defer();
    var query = new Parse.Query('canvases');
    query.startsWith(type, param)
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

  var createCanvas = function(object, description) {
    if (description !== undefined) {
      var blankCanvas = document.createElement('canvas');
      var base64 = blankCanvas.toDataURL('image/png');
      object.save({
        Base64: base64,
        description: description
      }, {
        success: function(canvas) {
          console.log('saved');
          setCurrent(canvas.id);
          $state.go('canvas', {});
        },
        error: function(canvas, error) {
          console.log('failed save');
        }
      });
    }
  }

  var updateCanvas = function(board, imgID) {
    var canvasData = board.toDataURL('image/png');
    var query = new Parse.Query("canvases");
    var currentCanvas;
    query.get(imgID, {
      success: function(result) {
        currentCanvas = result;
        currentCanvas.set("Base64", canvasData);
        currentCanvas.save();
        var currentUser = Parse.User.current();
        var relation = currentCanvas.relation("contributors");
        relation.add(currentUser);
      },
      error: function(currentCanvas) {
        console.log("Could not find the canvas");
      }
    });
  }

  var getContributors = function(imgID) {
    var deferred = $q.defer();
    var query = new Parse.Query("canvases");
    var currentCanvas;
    query.get(imgID, {
      success: function(result) {
        currentCanvas = result;
        var relation = currentCanvas.relation("contributors");
        relation.query().find({
          success: function(result) {
            deferred.resolve(result);
          },
          error: function(error) {
            deferred.reject(error.message);
            console.log('not updated');
          }
        })
      }
    })
    return deferred.promise;
  }

  return {
    setCurrent: setCurrent,
    getCurrent: getCurrent,
    fetch: fetch,
    searchBy: searchBy,
    createCanvas: createCanvas,
    updateCanvas: updateCanvas,
    getContributors: getContributors
  }
}]);
