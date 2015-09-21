$(document).ready(function() {
  var board = $(".board")[0];
  var boardSize = 1000;
  var pixelSize = 15;

  var ctx = board.getContext("2d");
  var background = $('.grid')[0];
  var gridContext = background.getContext('2d')

  board.height = boardSize;
  board.width = boardSize;
  background.height = boardSize;
  background.width = boardSize;

  new Grid().draw(gridContext);

  $(board).click(function(event) {
    var nearestX = Math.floor(event.pageX / 15) * 15;
    var nearestY = Math.floor(event.pageY / 15) * 15;
    ctx.fillStyle = "black";
    ctx.fillRect(nearestX, nearestY, pixelSize, pixelSize);
  });

  $('.toggle-grid').click(function () {
    $('.grid').toggle();
  })

});
