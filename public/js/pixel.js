function BoardInterface(context) {
  this.context = context;
}

BoardInterface.prototype.createPixel = function(action, x, y, size, pixelColor) {

  x = Math.floor(x / size) * size;
  y = Math.floor(y / size) * size;

  PixelGenerator.createDot(this.context, action, x, y, size, pixelColor);
};

var PixelGenerator = (function() {

  function createDot(ctx, action, x, y, size, pixelColor) {
    if (action === 'erase') {
      ctx.clearRect(x, y, size, size);
    } else if (action === 'draw') {
      ctx.fillStyle = pixelColor;
      ctx.fillRect(x, y, size, size);
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
    return rgb;
  }

  return {
    pickColour: pickColour
  }
})();
