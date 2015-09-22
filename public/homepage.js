var homepage = angular.module('Homepage', []);

homepage.controller('HomeController', ['$scope', function($scope) {
  $scope.boards = [];

  $scope.addBoard = function(title) {
    if (title.length > 0) {
      $scope.boards.push({
        'desc': title,
        'edit': false
      });
      $scope.boardDesc = '';
    };
  }

  $scope.editDesc = function(index, newDesc) {
    if (newDesc.length > 0) {
      $scope.boards[index].desc = newDesc;
    };
    $scope.boards[index].edit = false;
  }

  $scope.deleteBoard = function(index) {
    $scope.boards.splice(index, 1);
  }

}]);
