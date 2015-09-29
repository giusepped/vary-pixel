homepage.controller('CanvasController', ['$scope', 'CanvasProvider', '$timeout', '$interval', '$q', function($scope, CanvasProvider, $timeout, $interval, $q) {
  var socket = io();
  var board = $(".board")[0];
  var boardCtx = board.getContext("2d");
  var boardSize = 1500;
  var pixelSize = boardSize / 100;
  var boardInterface = new BoardInterface(boardCtx);
  var background = $('.grid')[0];
  var gridContext = background.getContext('2d');
  var paletteCanvas = $('.colour-palette')[0];
  var paletteCtx = paletteCanvas.getContext('2d');
  var pixelColor;
  var opts = {
    distance: pixelSize
  };
  var chosenCanvas = new Image();
  var colourPaletteImg = new Image();

  function imgID() {
    return CanvasProvider.getCurrent()[0];
  }

  $scope.imgDesc = function() {
    return CanvasProvider.getCurrent()[1];
    }
  function search(id) {
    function getBoard() {
      var deferred = $q.defer();
      var query = new Parse.Query(canvases);
      query.startsWith("objectId", id)
      query.find({
        success: function(result) {
          deferred.resolve(result);
          chosenCanvas.src = result[0].attributes.Base64;
        },
        error: function(error) {
          deferred.reject(error.message);
        }
      });
      return deferred.promise;
    }
    getBoard().then(function(canvas) {
      socket.emit('join', imgID());
    })
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
      };
    })
  })

  $(board).mouseup(function() {
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

  $('.home-button').click(function() {
    socket.emit('leave', imgID());
    CanvasProvider.setCurrent(null);
  })

  $('.colour-palette').hide();

  board.height = board.width = boardSize;
  background.height = background.width = boardSize;

  new Grid(opts).draw(gridContext);

  CanvasProvider.searchBy('objectId', imgID()).then(function(result) {
    chosenCanvas.src = result[0].attributes.Base64;
    socket.emit('join', imgID());
  })

  chosenCanvas.onload = function() {
    boardCtx.drawImage(chosenCanvas, 0, 0, boardSize, boardSize);
  }

  colourPaletteImg.onload = function() {
    paletteCanvas.width = paletteCanvas.height = 300;
    paletteCtx.drawImage(colourPaletteImg, 0, 0, paletteCanvas.width, paletteCanvas.height);
  }
  colourPaletteImg.src = 'images/ColorWheel-Base.png';

  // setInterval(function() {
  //   updateCanvas(board, imgID());
  // }, 3000);

  $('.save-canvas').click(function() {
    updateCanvas(board, imgID());
  })

}])
