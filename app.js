$(document).ready(function() {
  var board = $(".board")[0];
  var H = 1000;
  var W = 1000;

  var context = board.getContext("2d");

  board.height = H;
  board.width = W;
})