'use strict';

window.app.config(function($stateProvider) {
    $stateProvider.state('game', {
        url: '/game/:gameId',
        templateUrl: '/partials/game.template.html',
        controller: 'GameController'
    });
});