var Background = function() {

  Background.prototype.makeGrid = function(height, width) {
    var canvas = $('.grid')[0];
    var context = canvas.getContext("2d");
    var opts = {
      distance: 15,
      lineWidth: 0.4,
      gridColor: "#66ff00",
      caption: false,
      horizontalLines: true,
      verticalLines: true
    };
    new Grid(opts).draw(context);
    canvas.height = height;
    canvas.width = width;
  };
};
