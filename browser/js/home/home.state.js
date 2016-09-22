'use strict';

window.app.config(function($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        template: '<h1>Home State</h1>'
    });
    $stateProvider.state('about', {
        url: '/about',
        template: '<h1>About State</h1>'
    });
});