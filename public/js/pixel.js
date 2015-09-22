function BoardInterface(context) {
  this.context = context;
}

BoardInterface.prototype.createPixel = function(x, y, size, myColor) {
  x = Math.floor(x / size) * size;
  y = Math.floor(y / size) * size;
  PixelGenerator.createDot(this.context, x, y, size, myColor);
};

var PixelGenerator = (function() {

  function createDot(ctx, x, y, size, myColor) {
    ctx.fillStyle = "#" + myColor;
    ctx.fillRect(x, y, size, size);
  };

  return {
    createDot: createDot
  }
})();
