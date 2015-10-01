homepage.controller('CanvasController', ['$scope', 'CanvasProvider', 'PixelFactory', '$timeout', '$interval', '$q', function($scope, CanvasProvider, PixelFactory, $timeout, $interval, $q) {

  $scope.userAction = 'draw';

  $scope.imgDesc = function() {
    return CanvasProvider.getCurrent()[1];
  }

  $scope.action = function(action) {
    action = action || 'draw';
    if ($scope.userAction === 'erase') {
      $scope.userAction = 'draw';
    } else {
      $scope.userAction = action;
    };
  }

  var socket = io();
  var boardSize = 1500;
  var pixelSize = boardSize / 100;

  var board = $(".board")[0];
  var boardCtx = board.getContext("2d");

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
  paletteCanvas.width = paletteCanvas.height = 300;
  new Grid(opts).draw(gridContext);

  $('.colour-palette').hide();

  CanvasProvider.searchBy('objectId', imgID()).then(function(result) {
    chosenCanvas.src = result[0].attributes.Base64;
  })
  colourPaletteImg.src = 'images/ColorWheel-Base.png';

  socket.on('chat message', appendMessage);

  socket.on('coordinates', function(data) {
    PixelFactory.createPixel(boardCtx, data[0], data[1], data[2], pixelSize, data[3]);
  });

  chosenCanvas.onload = function() {
    joinRoom();
    boardCtx.drawImage(chosenCanvas, 0, 0, boardSize, boardSize);
  }

  colourPaletteImg.onload = function() {
    paletteCtx.drawImage(colourPaletteImg, 0, 0, paletteCanvas.width, paletteCanvas.height);
  }
  window.onunload = function() {
    leaveRoom();
  }

  function imgID() {
    return CanvasProvider.getCurrent()[0];
  }

  function drawOn(action, x, y, colour) {
    action = $scope.userAction;
    x = x || event.offsetX;
    y = y || event.offsetY;
    colour = colour || pixelColor;
    PixelFactory.createPixel(boardCtx, action, x, y, pixelSize, colour);
    socket.emit('coordinates', [action, x, y, colour, imgID()]);
  };

  function appendMessage(msg) {
    if ($('.chat-alert').css('display') === 'none' && $('.chatbox').css('display') === 'none') {
      $('.chat-alert').show();
    }
    $('.messages').append($('<li>').text(msg));
  }

  function joinRoom() {
    socket.emit('joinRoom', [imgID(), username]);
    socket.on('unsaved coordinates', function(data) {
      for (var i = 0; i < data.length; i++) {
        PixelFactory.createPixel(boardCtx, data[i][0], data[i][1], data[i][2], pixelSize, data[i][3]);
      }
    })
  }

  function leaveRoom() {
    socket.emit('leaveRoom', [imgID(), username]);
    socket.removeListener('chat message', appendMessage);
    CanvasProvider.updateCanvas(board, imgID())
    CanvasProvider.setCurrent(null);
  }

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

  $(board).dblclick(function() {
    $scope.userAction = 'erase';
    drawOn();
    $scope.userAction = 'draw';
  });

  $(board).mouseup(function() {
    $(board).off("mousemove");
  })

  $('.onoffswitch-checkbox').click(function() {
    $('.grid').toggle();
  });

  $('.colour-palette-toggle').click(function() {
    $('.colour-palette').fadeToggle('slow');
    $('.colour-palette-toggle').fadeToggle('slow');
  })

  $('.colour-palette').click(function() {
    var x = event.offsetX;
    var y = event.offsetY;
    pixelColor = PixelFactory.whatColour(paletteCtx, x, y);
    $('.colour-palette').fadeToggle('slow');
    $('.colour-palette-toggle').fadeToggle('slow');
  })

  $('.home-button').click(function() {
    leaveRoom();
  })

  $('.chat-button').click(function() {
    $('.chatbox').toggle();
    $('.chat-alert').hide();
  });

  $('.chat').submit(function() {
    socket.emit('chat message', [$('.msg').val(), username, imgID()]);
    $('.msg').val('');
    return false;
  });

}])
