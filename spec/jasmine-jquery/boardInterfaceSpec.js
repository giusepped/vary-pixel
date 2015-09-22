describe("BoardInterface", function() {

  var bI;
  var ctx = {
    fillRect: function() {}
  };

  it("creates a pixel at a given location on the board", function() {
    spyOn(ctx, "fillRect");
    bI = new BoardInterface(ctx)

    bI.createPixel(100, 100, 15);
    coordinate = Math.floor(100 / 15) * 15

    expect(ctx.fillRect).toHaveBeenCalledWith(coordinate, coordinate, 15, 15);
  })

})