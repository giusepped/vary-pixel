var homepage = angular.module('Homepage',[]);

homepage.controller('HomeController', ['$scope', function($scope) {
  $scope.boards = [];

  $scope.addBoard = function (title) {
    $scope.boards.push({
      'title': title
    })
    $scope.boardTitleValue = ''
  }
}])
