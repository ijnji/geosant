'use strict';

window.app.controller('HomeController', function($scope, $state, SocketFactory) {
    let socket = SocketFactory.socket;

    socket.on('eServerGameAvailable', function(msgObj) {
        console.log('Game available at ' + msgObj.gameId);
        $state.transitionTo('game', {
            gameId: msgObj.gameId
        });
    });

    $scope.getOpenGame = function() {
        socket.emit('eClientGetOpenGame');
    };
    $scope.createNewGame = function() {
        socket.emit('eClientCreateGame');
    };
});
