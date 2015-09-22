describe("BoardInterface", function() {

  var bI;
  var ctx = {
    fillRect: function() {}
  };

  it("creates a pixel at a given location on the board", function() {
    spyOn(ctx, "fillRect");
    bI = new BoardInterface(ctx)

    bI.createPixel(100, 100, 10);

    expect(ctx.fillRect).toHaveBeenCalledWith(85, 90, 10, 10);
  });

  it("can create a pixel with different colors", function(){

  });

})