var canvases = Parse.Object.extend("canvases");

function saveCanvas(board, title) {
  var canvasData = board.toDataURL('image/png');
  var canvas = new canvases();
  var file = new Parse.File("canvasData.txt", { base64: canvasData });
  file.save().then(function() {
    var message = $('.save-alert').text('Your drawing has been saved!');
    hideFlashMessage(message);
  }, function(error) {
    var message = $('.save-alert').text('Whoops! Something went wrong!');
    hideFlashMessage(message);
  });
  canvas.set("picture", file);
  canvas.set("name", title)
  canvas.save();
}

function hideFlashMessage(message) {
  message.delay(2000).fadeOut('normal', function() {
    $(this).remove();
  });
}