'use strict';

window.app.controller('HomeController', function($scope, SocketFactory) {
    $scope.joinGame = function() {
        SocketFactory.joinGame($scope.mGameName);
    };
    $scope.newGame = function() {
        SocketFactory.newGame();
    };
});