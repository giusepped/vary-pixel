function BoardInterface(context) {
  this.context = context;
  this.userLimit = 100;
}

BoardInterface.prototype.createPixel = function(x, y, size, myColor) {

  var a = this.context.getImageData(x, y, 1, 1).data;
  var rgb = a[0] + '' + a[1] + '' + a[2] + '' + a[3];

  x = Math.floor(x / size) * size;
  y = Math.floor(y / size) * size;

  if (rgb == 0000) {
    PixelGenerator.createDot(this.context, x, y, size, myColor);
    this.userLimit--;
  } else {
    this.context.clearRect(x, y, size, size);
    this.userLimit++;
  };
};

var PixelGenerator = (function() {

  function createDot(ctx, x, y, size, pixelColor) {
    ctx.fillStyle = "#" + pixelColor;
    ctx.fillRect(x, y, size, size);
  };

  return {
    createDot: createDot
  }
})();
