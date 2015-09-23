$(document).ready(function() {
  var socket = io();
  var board = $(".board")[0];
  var boardCtx = board.getContext("2d");
  var boardInterface = new BoardInterface(boardCtx);
  var boardSize = 1000;
  var pixelSize = 15;
  var background = $('.grid')[0];
  var gridContext = background.getContext('2d');
  var pixelColor;
  var opts = {
    distance: pixelSize
  };

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

  $('.save-canvas').click(function() {
    saveCanvas(board, "test1225");
  });

});
