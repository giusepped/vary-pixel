
$(document).ready(function() {
  var board = $(".board")[0];

  board.height = board.width = 1000;
  var boardInterface = new BoardInterface(board.getContext("2d"));

  $(board).click(drawOn);

  function drawOn(event) {
    boardInterface.createPixel(event.x, event.y);
  }

});