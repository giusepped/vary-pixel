homepage.service('AllCanvas', function() {
  var Boards = [];

  var setBoard = function (boards) {
    Boards = boards;
  }

  var allBoards = function () {
    return Boards;
  }

  return {
    allBoards: allBoards,
    setBoard: setBoard
  }
})
