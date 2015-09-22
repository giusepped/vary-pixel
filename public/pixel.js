function BoardInterface(context) {
  this.context = context;
}

BoardInterface.prototype.createPixel = function(x, y, size) {
  x = Math.floor(x / size) * size;
  y = Math.floor(y / size) * size;
  PixelGenerator.createDot(this.context, x, y, size);
};

var PixelGenerator = (function() {

  function createDot(ctx, x, y, size) {
    ctx.fillStyle = "black";
    ctx.fillRect(x, y, size, size);
  };

  return {
    createDot: createDot
  }
})();
