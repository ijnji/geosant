'use strict';

window.app = angular.module('GeosentApp', ['ui.router']);

window.app.config(function($locationProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
});

window.app.run(function(SocketFactory) {});
