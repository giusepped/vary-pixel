function BoardInterface(context) {
  this.context = context;
  this.userLimit = 100;
}

BoardInterface.prototype.createPixel = function(x, y, size, pixelColor) {

  x = Math.floor(x / size) * size;
  y = Math.floor(y / size) * size;

  if (PixelGenerator.createDot(this.context, x, y, size, pixelColor)) {
    this.userLimit--;
    console.log(this.userLimit);
  } else {
    this.userLimit++;
    console.log(this.userLimit);
  };
};

var PixelGenerator = (function() {

  function createDot(ctx, x, y, size, pixelColor) {
    if (WhatColour.pickColour(ctx, x, y) === 'rgba(0,0,0,0)') {
      ctx.fillStyle = pixelColor
      ctx.fillRect(x, y, size, size);
      return true
    } else {
      ctx.clearRect(x, y, size, size);
      return false
    }
  };

  return {
    createDot: createDot
  }
})();

var WhatColour = (function() {
  function pickColour(ctx, x, y) {
    var a = ctx.getImageData(x, y, 1, 1).data;
    var rgb = 'rgba(' + a[0] + ',' + a[1] + ',' + a[2] + ',' + a[3] + ')';
    return rgb
  }

  return {
    pickColour: pickColour
  }
})();
