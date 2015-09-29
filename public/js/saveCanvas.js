var canvases = Parse.Object.extend("canvases");

function hideFlashMessage(message) {
  message.delay(2000).fadeOut('normal', function() {
    $(this).remove();
  });
}

function updateCanvas(board, imgID) {
  var canvasData = board.toDataURL('image/png');
  var query = new Parse.Query(canvases);
  var currentCanvas;
  query.get(imgID, {
    success:function(currentCanvas) {
      currentCanvas = currentCanvas;
      currentCanvas.set("Base64", canvasData);
      currentCanvas.save();
      var message = $('.save-alert').text('Your drawing has been updated!');
      hideFlashMessage(message);
      var currentUser = Parse.User.current();
      var contributors = currentCanvas.relation("contributors");
      contributors.add(currentUser);
      contributors.query().find({
        success:function(result){
          console.log(imgID);
        },
        error:function(){
          console.log("oops");
        }
      });
    },
    error: function(currentCanvas) {
      console.log("Could not find the canvas");
    }
  });

}
