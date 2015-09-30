homepage.controller('CanvasController', ['$scope', 'CanvasProvider', '$timeout', '$interval', '$q', function($scope, CanvasProvider, $timeout, $interval, $q) {
  var socket = io();
  var board = $(".board")[0];
  var boardCtx = board.getContext("2d");
  var boardSize = $(window).width();
  var pixelSize = boardSize / 125;
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

  $scope.userAction = 'draw';

  board.height = board.width = boardSize;
  background.height = background.width = boardSize;
  new Grid(opts).draw(gridContext);

  function imgID() {
    return CanvasProvider.getCurrent()[0];
  }

  function pageResize() {
    boardSize = $(window).width();
    pixelSize = boardSize / 125;
    board.height = board.width = boardSize;
    background.height = background.width = boardSize;
    opts = {
      distance: pixelSize
    };
    new Grid(opts).draw(gridContext);
  }

  $scope.imgDesc = function() {
    return CanvasProvider.getCurrent()[1];
  }

  $scope.action = function() {
    if ($scope.userAction === 'draw') {
      $scope.userAction = 'erase';
    } else {
      $scope.userAction = 'draw';
    }
  }

  function drawOn(action, x, y, colour) {
    action = $scope.userAction;
    x = x || event.offsetX;
    y = y || event.offsetY;
    colour = colour || pixelColor;
    boardInterface.createPixel(action, x, y, pixelSize, colour);
    socket.emit('coordinates', [action, x, y, colour, imgID()]);
  };

  socket.on('coordinates', function(data) {
    boardInterface.createPixel(data[0], data[1], data[2], pixelSize, data[3]);
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
      if (Math.abs(prevX - x) > (pixelSize - 1) || Math.abs(prevY - y) > (pixelSize - 1)) {
        drawOn();
        prevX = x;
        prevY = y;
      };
    })
  })

  $(board).mouseup(function() {
    $(board).off("mousemove");
  })

  $(window).resize(function() {
    pageResize();
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
    $scope.userAction = 'draw';
    $('.colour-palette').fadeToggle('slow');
    $('.colour-palette-toggle').fadeToggle('slow');
  })

  $('.home-button').click(function() {
    leaveRoom();
  })

  window.onunload = function() {
    leaveRoom();
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

  function joinRoom() {
    socket.emit('joinRoom', [imgID(), username]);
    socket.on('unsaved coordinates', function(data) {
      for (var i = 0; i < data.length; i++) {
        boardInterface.createPixel(data[i][0], data[i][1], pixelSize, data[i][2]);
      }
    })
  }

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

  function leaveRoom() {
    socket.emit('leaveRoom', [imgID(), username]);
    socket.removeListener('chat message', appendMessage);
    CanvasProvider.updateCanvas(board, imgID())
    CanvasProvider.setCurrent(null);
  }

}])
