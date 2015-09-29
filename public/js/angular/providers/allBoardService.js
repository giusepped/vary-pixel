homepage.service('CanvasProvider', function() {
  var currentID = [];

  var setCurrent = function (id, description) {
    currentID = [id, description];
  }

  var getCurrent = function () {
    return currentID;
  }

  return {
    setCurrent: setCurrent,
    getCurrent: getCurrent,
  }
})
