homepage.factory('PixelFactory', function() {

  var createPixel = function(ctx, action, x, y, size, pixelColor) {
    x = Math.floor(x / size) * size;
    y = Math.floor(y / size) * size;

    if (action === 'erase') {
      ctx.clearRect(x, y, size, size);
    } else if (action === 'draw') {
      ctx.fillStyle = pixelColor;
      ctx.fillRect(x, y, size, size);
    }
  }

  var whatColour = function(ctx, x, y) {
    var a = ctx.getImageData(x, y, 1, 1).data;
    var rgb = 'rgba(' + a[0] + ',' + a[1] + ',' + a[2] + ',' + a[3] + ')';
    return rgb;
  }

  return {
    createPixel: createPixel,
    whatColour: whatColour
  };
})
