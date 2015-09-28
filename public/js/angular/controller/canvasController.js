homepage.controller('CanvasController', ['$scope', 'AllCanvas', '$timeout', '$interval', function($scope, AllCanvas, $timeout, $interval) {
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
  var drawChosenCanvas = new Image();
  drawChosenCanvas.crossOrigin = "anonymous";
  var colourPaletteImg = new Image();
  var pixelLimit = 200;  

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
        showPixelLimit();
      };
    })
    showPixelLimit();
  })

  $(board).mouseup(function() {
    $(board).off("mousemove");
  })

  function drawOn() {
    if (boardInterface.userLimit > 0){
      boardInterface.createPixel(event.offsetX, event.offsetY, pixelSize, pixelColor);
      socket.emit('coordinates', [event.offsetX, event.offsetY, pixelColor, imgID()]);
    };
  };

  function showPixelLimit(){
    var pixmessage = $('.pixel-limit').text(boardInterface.userLimit)
    FlashMessage(pixmessage);
  };  

  socket.on('coordinates', function(data) {
    if (data[3] === imgID()) {
      boardInterface.createPixel(data[0], data[1], pixelSize, data[2]);
    }
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

  $('.colour-palette').hide();

  board.height = board.width = boardSize;
  background.height = background.width = boardSize;

  new Grid(opts).draw(gridContext);

  drawChosenCanvas.onload = function() {
    boardCtx.drawImage(drawChosenCanvas, 0, 0, boardSize, boardSize);
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
  }, 6000);

}])
