var PixelGenerator = (function() {

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