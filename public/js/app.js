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
  var paletteCanvas = $('.colour-palette')[0];
  var paletteCtx = paletteCanvas.getContext('2d');
  var pixelColor;
  var opts = {
    distance: pixelSize
  };

  board.height = board.width = boardSize;
  background.height = background.width = boardSize;

  new Grid(opts).draw(gridContext);

  // $(".color").on("change", function() {
  //   pixelColor = $(".color").val();
  // });

  $(board).click(drawOn);

  var colourPaletteImg = new Image();
  colourPaletteImg.onload = function() {
    paletteCanvas.width = paletteCanvas.height = 300;
    paletteCtx.drawImage(colourPaletteImg, 0, 0, paletteCanvas.width, paletteCanvas.height);
  }
  colourPaletteImg.src = 'images/ColorWheel-Base.png'

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
