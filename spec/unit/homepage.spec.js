describe('Homepage', function () {
  beforeEach(module('Homepage'));

  var scope, controller;

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    controller = $controller('HomeController', {
      $scope: scope
    });
  }));

  it('can add a task', function () {
    expect(scope.boards.length).toEqual(0);
    scope.boardTitleValue = 'A crazy day inside a beer can';
    scope.addBoard(scope.boardTitleValue);
    expect(scope.boards.length).toEqual(1)
  });
});
