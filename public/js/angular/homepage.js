var homepage = angular.module('Homepage', ['ui.router']);

homepage.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: "/js/angular/templates/homepage.html",
      controller: "HomeController",
      data: {
        requireLogin: false
      }
    })
    .state('canvas', {
      url: '/',
      templateUrl: "/js/angular/templates/canvas.html",
      controller: "CanvasController",
      data: {
        requireLogin: true
      }
    })
}])
