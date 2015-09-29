homepage.factory('CanvasProvider', ['$q', '$state', function($q, $state) {
  var currentID = [];

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
        console.log('failed');
      }
    });
  }

  return {
    setCurrent: setCurrent,
    getCurrent: getCurrent,
    fetch: fetch,
    searchBy: searchBy,
    createCanvas: createCanvas
  }
}])
