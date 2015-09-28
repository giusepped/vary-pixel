function BoardInterface(context, limit) {
  this.context = context;

}

BoardInterface.prototype.createPixel = function(x, y, size, pixelColor) {

  x = Math.floor(x / size) * size;
  y = Math.floor(y / size) * size;

  var created = PixelGenerator.createDot(this.context, x, y, size, pixelColor);
};

var PixelGenerator = (function() {

  function createDot(ctx, x, y, size, pixelColor) {
    var colour = WhatColour.pickColour(ctx, x, y);
    if (colour === 'rgba(0,0,0,0)') {
      ctx.fillStyle = pixelColor;
      ctx.fillRect(x, y, size, size);
    } else {
      ctx.clearRect(x, y, size, size);
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
