describe("BoardInterface", function() {

  var bI;
  var ctx = {
    fillRect: function() {},
    getImageData: function() {}
  };

  beforeEach(function() {
    bI = new BoardInterface(ctx)
  })

  it("creates a pixel at a given location on the board", function() {
    spyOn(ctx, "fillRect");
    spyOn(ctx, "getImageData").and.returnValue({data: [0,0,0,0]});
    bI = new BoardInterface(ctx)

    bI.createPixel(100, 100, 15);
    coordinate = Math.floor(100 / 15) * 15
    expect(ctx.getImageData).toHaveBeenCalledWith(coordinate, coordinate, 1, 1)
    expect(ctx.fillRect).toHaveBeenCalledWith(coordinate, coordinate, 15, 15);
  });

  //
  // it("can create a pixel with different colors", function() {
  //
  // });
  //

  it('decreases the user limit count after painting', function() {
    spyOn(ctx, "getImageData").and.returnValue({data: [0,0,0,0]});

    bI.createPixel(100, 100, 15);
    expect(bI.userLimit).toEqual(99);
  });

  // cannot double spy
  // it('knows to increase user limit count after removing', function() {
  //   spyOn(ctx, "getImageData").and.returnValue({data: [0,0,0,255]});
  //
  //   bI.createPixel(100, 100, 15);
  //   expect(bI.userLimit).toEqual(99);
  //   // ctx.getImageData.data = [0,0,0,255];
  //   bI.createPixel(100, 100, 15);
  //   expect(bI.userLimit).toEqual(100);
  // });

});
