$(document).ready(function() {
  Parse.initialize("U5tqKkqGtSb4VBBDRGmmtpjofTvtoyyrpWkN4BN8", "f5qinAxXHxneK1rrw8NPn787gglu20AGl6S0PeuD");
  var canvases = Parse.Object.extend("canvases");
  var socket = io();
  var board = $(".board")[0];
  var boardCtx = board.getContext("2d");
  var boardInterface = new BoardInterface(boardCtx);
  var boardSize = 1500;
  var pixelSize = 15;
  var background = $('.grid')[0];
  var gridContext = background.getContext('2d');
  var pixelColor;
  var opts = {
    distance: pixelSize
  };

  var canvasData;

  board.height = board.width = boardSize;
  background.height = background.width = boardSize;

  new Grid(opts).draw(gridContext);

  $(".color").on("change", function() {
    pixelColor = $(".color").val();
  });

  $(board).click(drawOn);

  function drawOn() {
    boardInterface.createPixel(event.pageX, event.pageY, pixelSize, pixelColor);
    socket.emit('coordinates', [event.pageX, event.pageY]);
  }

  socket.on('coordinates', function(data) {
    boardInterface.createPixel(data[0], data[1], pixelSize, pixelColor);
  });

  $('.toggle-grid').click(function() {
    $('.grid').toggle();
  });

  $('.colour-palette-toggle').click(function() {
    $('.colour-palette').fadeToggle('fast')
  })

  function flashMessage(message) {
    message.delay(2000).fadeOut('normal', function() {
      $(this).remove();
    });
  }

  $('.save-canvas').click(function() {
    canvasData = board.toDataURL('image/png');
    var canvas = new canvases();
    var file = new Parse.File("canvasData.txt", { base64: canvasData });
    file.save().then(function() {
      var message = $('.save-alert').text('Your drawing is saved!');
      flashMessage(message);
    }, function(error) {
      var message = $('.save-alert').text('Whoops! Something went wrong!');
      flashMessage(message);
    });
    canvas.set("picture", file);
    canvas.set("name", "Hello")
    canvas.save();
  });

});
