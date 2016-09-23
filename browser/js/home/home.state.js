'use strict';

window.app.config(function($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: '/partials/home.template.html',
        controller: 'HomeController'
    });
});