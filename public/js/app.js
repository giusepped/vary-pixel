$(document).ready(function() {
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

  $(board).mousedown(function() {
    $('.colour-palette').fadeOut('slow');
    $('.colour-palette-toggle').fadeIn('slow');
    var prevX = Math.floor(event.offsetX / pixelSize) * pixelSize;
    var prevY = Math.floor(event.offsetY / pixelSize) * pixelSize;
    drawOn()
    $(board).mousemove(function(e) {
      x = Math.floor(event.offsetX / pixelSize) * pixelSize;
      y = Math.floor(event.offsetY / pixelSize) * pixelSize;
      if (Math.abs(prevX - x) > 14 || Math.abs(prevY - y) > 14) {
        drawOn();
        prevX = x;
        prevY = y;
      };
    })
  })

  $(board).mouseup(function() {
    $(board).off("mousemove");
  })

  var colourPaletteImg = new Image();
  colourPaletteImg.onload = function() {
    paletteCanvas.width = paletteCanvas.height = 300;
    paletteCtx.drawImage(colourPaletteImg, 0, 0, paletteCanvas.width, paletteCanvas.height);
  }
  colourPaletteImg.src = 'images/ColorWheel-Base.png'

  function drawOn() {
    boardInterface.createPixel(event.offsetX, event.offsetY, pixelSize, pixelColor);
    socket.emit('coordinates', [event.offsetX, event.offsetY, pixelColor]);
  }

  socket.on('coordinates', function(data) {
    boardInterface.createPixel(data[0], data[1], pixelSize, data[2]);
  });

  $('.toggle-grid').click(function() {
    $('.grid').toggle();
  });

  $('.colour-palette').hide();

  $('.colour-palette-toggle').click(function() {
    $('.colour-palette').fadeToggle('slow');
    $('.colour-palette-toggle').fadeToggle('slow');
  })

  $('.colour-palette').click(function() {
    var x = event.offsetX;
    var y = event.offsetY;
    pixelColor = WhatColour.pickColour(paletteCtx, x, y);
    $('.colour-palette').fadeToggle('slow');
    $('.colour-palette-toggle').fadeToggle('slow');
  })

  $('.save-canvas').click(function() {
    //$('save-alert').text('Your drawing has been saved!');
    saveCanvas(board, "hello");
  });

});
