'use strict';

window.app = angular.module('GeosentApp', ['ui.router']);

window.app.config(function($urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
});