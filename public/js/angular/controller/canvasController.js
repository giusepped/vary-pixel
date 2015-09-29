homepage.controller('CanvasController', ['$scope', 'AllCanvas', '$timeout', '$interval', function($scope, AllCanvas, $timeout, $interval) {
  var socket = io();
  var board = $(".board")[0];
  var boardCtx = board.getContext("2d");
  var boardSize = 1500;
  var pixelSize = boardSize/100;
  var boardInterface = new BoardInterface(boardCtx);
  var background = $('.grid')[0];
  var gridContext = background.getContext('2d');
  var paletteCanvas = $('.colour-palette')[0];
  var paletteCtx = paletteCanvas.getContext('2d');
  var pixelColor;
  var opts = {
    distance: pixelSize
  };
  var drawChosenCanvas = new Image();
  drawChosenCanvas.crossOrigin = "anonymous";
  var colourPaletteImg = new Image();

  function imgID() {
    return AllCanvas.getCurrent();
  }

  function imgUrl() {
    var array = AllCanvas.allBoards();
    for (var i = 0; i < array.length; i++) {
      if (array[i].id === imgID()) return array[i].attributes.picture.url();
    }
  }

  function imgDesc() {
    var array = AllCanvas.allBoards();
    for (var i = 0; i < array.length; i++) {
      if (array[i].id === imgID()) return array[i].attributes.description;
    }
  }

  $(board).mousedown(function() {
    event.preventDefault();
    $('.board').addClass('mouseDown');
    $('.colour-palette').fadeOut('slow');
    $('.colour-palette-toggle').fadeIn('slow');
    console.log(event);
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
    $('.board').removeClass('mouseDown');
    $(board).off("mousemove");
  })

  function drawOn() {
    boardInterface.createPixel(event.offsetX, event.offsetY, pixelSize, pixelColor);
    socket.emit('coordinates', [event.offsetX, event.offsetY, pixelColor, imgID()]);
  };

  socket.on('coordinates', function(data) {
    boardInterface.createPixel(data[0], data[1], pixelSize, data[2]);
  });

  $('.toggle-grid').click(function() {
    $('.grid').toggle();
  });

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
    updateCanvas(board, imgID());
  });

  $('.home-button').click(function() {
    socket.emit('leave', imgID());
    AllCanvas.setCurrent(null);
  })

  $('.colour-palette').hide();

  board.height = board.width = boardSize;
  background.height = background.width = boardSize;

  new Grid(opts).draw(gridContext);

  drawChosenCanvas.onload = function() {
    boardCtx.drawImage(drawChosenCanvas, 0, 0, boardSize, boardSize);
    socket.emit('join', imgID());
  }
  drawChosenCanvas.src = imgUrl();

  colourPaletteImg.onload = function() {
    paletteCanvas.width = paletteCanvas.height = 300;
    paletteCtx.drawImage(colourPaletteImg, 0, 0, paletteCanvas.width, paletteCanvas.height);
  }
  colourPaletteImg.src = 'images/ColorWheel-Base.png';

  if (imgUrl() === undefined) {
    $timeout(function() {
      angular.element('.save-canvas').trigger('click');
    }, 300);
  }

  $interval(function() {
    angular.element('.save-canvas').trigger('click');
  }, 3000);

}])
