
var PixelGenerator = (function() {
  // $(".color").on("change", function() {
  //   console.log($(".color").val())
  // });

  function createDot(ctx, x, y, size) {
    console.log("am I drawing?");
    ctx.fillStyle = "black";
    ctx.fillRect(x, y, size, size);
  };

  return {
    createDot: createDot
  }
})();

function BoardInterface(context) {
  this.context = context
}

BoardInterface.prototype.createPixel = function(x, y, size) {
  // here transform x and y as you want
  PixelGenerator.createDot(this.context, x, y, size)
};


  // var rgbString = "rgb(0, 70, 255)"; // get this in whatever way.

  // var parts = rgbString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  // // parts now should be ["rgb(0, 70, 255", "0", "70", "255"]

  // delete (parts[0]);
  // for (var i = 1; i <= 3; ++i) {
  //   parts[i] = parseInt(parts[i]).toString(16);
  //   if (parts[i].length == 1) parts[i] = '0' + parts[i];
  // } 
  // var hexString ='#'+parts.join('').toUpperCase(); // "#0070FF"
  // console.log(hexString)
