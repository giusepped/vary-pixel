describe('Homepage', function() {
  beforeEach(module('Homepage'));

  var scope, controller;

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    controller = $controller('HomeController', {
      $scope: scope
    });
  }));

  var addBoard = function(value) {
    scope.boardDesc = value;
    scope.addBoard(scope.boardDesc);
  }

  it('starts with no board', function () {
    expect(scope.boards.length).toEqual(0);
  });

  it('can add a board', function() {
    expect(scope.boards.length).toEqual(0);
    addBoard('hello')
    expect(scope.boards.length).toEqual(1);
    expect(scope.boards[0].edit).toEqual(false);
    expect(scope.boards[0].desc).toEqual('hello');
  });

  it('can edit a board', function() {
    addBoard('hello');
    scope.editDesc(0, 'not hello');
    expect(scope.boards[0].desc).toEqual('not hello')
  });

  it('can delete a board', function () {
    addBoard('halloo');
    scope.deleteBoard(0);
    expect(scope.boards.length).toEqual(0);
  });

  it('cannot create board with empty desc', function () {
    addBoard('');
    expect(scope.boards.length).toEqual(0);
  });

  it('cannot edit and input empty desc', function () {
    addBoard('bottle');
    scope.editDesc(0,'');
    expect(scope.boards[0].desc).toEqual('bottle');
  });
});
