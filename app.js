$(document).ready(function() {
  var board = $(".board")[0];
  var boardSize = 1000;
  var pixelSize = 10;

  var ctx = board.getContext("2d");

  board.height = boardSize;
  board.width = boardSize;


  $(board).click(function(event) {
    mouseX = event.pageX - (pixelSize + 5);
    mouseY = event.pageY - (pixelSize);
    ctx.fillStyle = "black";
    ctx.fillRect(mouseX, mouseY, pixelSize, pixelSize);
  });

});