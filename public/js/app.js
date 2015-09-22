$(document).ready(function() {
  var board = $(".board")[0];
  var ctx = board.getContext("2d");
  var boardInterface = new BoardInterface(ctx);
  var boardSize = 1000;
  var pixelSize = 15;
  var background = $('.grid')[0];
  var gridContext = background.getContext('2d');
  var myColor;

  board.height = board.width = boardSize;
  background.height = background.width = boardSize;
  var opts = { distance: pixelSize};
  new Grid(opts).draw(gridContext);

  $(".color").on("change", function() {
    myColor = $(".color").val()
    console.log(myColor)
  });


  $(board).click(drawOn);

  function drawOn() {
    boardInterface.createPixel(event.pageX, event.pageY, pixelSize, myColor);
  }

  $('.toggle-grid').click(function () {
    $('.grid').toggle();
  })
});
