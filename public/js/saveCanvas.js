var canvases = Parse.Object.extend("canvases");

function hideFlashMessage(message) {
  message.delay(2000).fadeOut('normal', function() {
    $(this).remove();
  });
}

function updateCanvas(board, imgID) {
  var canvasData = board.toDataURL('image/png');
  var query = new Parse.Query(canvases);
  var file = new Parse.File("canvasData.txt", { base64: canvasData });
  query.get(imgID, {
    success:function(result) {
      result.set("picture", file);
      result.save();
      var message = $('.save-alert').text('Your drawing has been updated!');
      hideFlashMessage(message);
      var currentUser = Parse.User.current();
      var contributors = result.relation("contributors");
      contributors.add(currentUser);
    },
    error: function() {
      console.log("Could not find the canvas");
    }
  });

}