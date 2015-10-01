// describe('factory: PixelFactory', function() {
//   beforeEach(module('Homepage', ['ui.router']));

//   var pixelFactory;

//   beforeEach(inject(function(PixelFactory) {
//     pixelFactory = PixelFactory;
//   }));

//   var ctx = {
//     fillRect: function() {},
//     clearRect: function() {},
//     fillStyle: rgb(0, 0, 0),
//     getImageData: function() {}
//   }

//   xit('can draw a pixel', function() {
//     spyOn(ctx, "fillRect");
//     pixelFactory.createPixel(ctx, 'draw', 0, 0, 15, rgb(0, 0, 0));
//     expect(ctx.fillRect).toHaveBeenCalledWith(0, 0, 15, 15);
//   });

//   xit('can erase a pixel', function() {

//   });
  // it('can add a board', function() {
  //   var saveToParse = { saving: function() {} }
  //   spyOn(saveToParse, 'saving');
  //   scope.addBoard('hello');
  //   expect(saveToParse.saving).toHaveBeenCalled();
  // });

  // it('can edit a board', function() {
  //   addBoard('hello');
  //   scope.editDesc(0, 'not hello');
  //   expect(scope.boards[0].desc).toEqual('not hello')
  // });
  //
  // it('can delete a board', function() {
  //   addBoard('halloo');
  //   scope.deleteBoard(0);
  //   expect(scope.boards.length).toEqual(0);
  // });
  //
  // it('cannot create board with empty desc', function() {
  //   addBoard('');
  //   expect(scope.boards.length).toEqual(0);
  // });
  //
  // it('cannot edit and input empty desc', function() {
  //   addBoard('bottle');
  //   scope.editDesc(0, '');
  //   expect(scope.boards[0].desc).toEqual('bottle');
  // });

});
