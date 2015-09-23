describe("BoardInterface", function() {

  var bI;
  var ctx = {
    fillRect: function() {},
    getImageData: function() {}
  };

  it("creates a pixel at a given location on the board", function() {
    spyOn(ctx, "fillRect");
    bI = new BoardInterface(ctx)

    bI.createPixel(100, 100, 15);
    coordinate = Math.floor(100 / 15) * 15

    expect(ctx.fillRect).toHaveBeenCalledWith(coordinate, coordinate, 15, 15);
  });


  it("can create a pixel with different colors", function() {

  });

  it('cannot fill the same pixel twice', function() {

  });

  it('decreases the user limit count after painting', function() {
    setFixtures("<canvas id='screen' style='width:1000px; height:1000px;'></canvas>")
    var canvas = $('#canvas');
    var ctx = canvas.getContext('2d');
    console.log(canvas);

    bI.createPixel(100, 100, 15);
    expect(bI.userLimit).toEqual(99);
  });

  it('knows to increase user limit count after removing', function() {

  });

});
