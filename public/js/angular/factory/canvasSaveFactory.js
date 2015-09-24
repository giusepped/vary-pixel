homepage.factory('Save', ['$http', function($http) {
  return {
    save: function(description) {
      var canvases = Parse.Object.extend("canvases");
      var canvas = new Canvases();

      canvas.save({
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
  };
}])
