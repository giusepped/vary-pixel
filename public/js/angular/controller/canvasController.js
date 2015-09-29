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
  var pixelColor = 'rgba(0,0,0,255)';
  var opts = {
    distance: pixelSize
  };
  var chosenCanvas = new Image();
  var colourPaletteImg = new Image();
  var userObj = Parse.User.current();
  var username = userObj.get("username");

  board.height = board.width = boardSize;
  background.height = background.width = boardSize;
  new Grid(opts).draw(gridContext);

  function imgID() {
    return CanvasProvider.getCurrent()[0];
  }

  $scope.imgDesc = function() {
    return CanvasProvider.getCurrent()[1];
  }

  function drawOn(x, y, colour) {
    x = x || event.offsetX;
    y = y || event.offsetY;
    colour = colour || pixelColor;

    boardInterface.createPixel(x, y, pixelSize, colour);
    socket.emit('coordinates', [x, y, colour, imgID()]);
  };

  socket.on('coordinates', function(data) {
    drawOn(data[0], data[1], data[2]);
  });

  $(board).mousedown(function() {
    $('.colour-palette').fadeOut('slow');
    $('.colour-palette-toggle').fadeIn('slow');
    var prevX = Math.floor(event.offsetX / pixelSize) * pixelSize;
    var prevY = Math.floor(event.offsetY / pixelSize) * pixelSize;
    drawOn()
    $(board).mousemove(function() {
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
    socket.emit('leaveRoom', [imgID(), username]);
    socket.removeListener('chat message', appendMessage);
    CanvasProvider.setCurrent(null);
  })

  window.onunload = function() {
    socket.emit('leaveRoom', [imgID(), username]);
    socket.removeListener('chat message', appendMessage);
  }

  $('.colour-palette').hide();

  CanvasProvider.searchBy('objectId', imgID()).then(function(result) {
    chosenCanvas.src = result[0].attributes.Base64;
  })

  chosenCanvas.onload = function() {
    joinRoom();
    boardCtx.drawImage(chosenCanvas, 0, 0, boardSize, boardSize);
  }

  colourPaletteImg.onload = function() {
    paletteCanvas.width = paletteCanvas.height = 300;
    paletteCtx.drawImage(colourPaletteImg, 0, 0, paletteCanvas.width, paletteCanvas.height);
  }

  colourPaletteImg.src = 'images/ColorWheel-Base.png';

  setInterval(function() {
    socket.emit('canvas', [imgID(), board.toDataURL('image/png')]);
  }, 5000);

  function joinRoom() {
    socket.emit('joinRoom', [imgID(), username]);
  }

  $('.save-canvas').click(function() {
    CanvasProvider.updateCanvas(board, imgID());
  })

  $('.chat-button').click(function() {
    $('.chatbox').toggle();
  });

  $('.chat').submit(function() {
    socket.emit('chat message', [$('.msg').val(), username, imgID()]);
    $('.msg').val('');
    return false;
  });

  socket.on('chat message', appendMessage);

  function appendMessage(msg) {
    $('.messages').append($('<li>').text(msg));
  }
}])
