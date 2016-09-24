'use strict';

window.app.factory('SocketFactory', function() {
    let factory = {};

    factory.socket = window.io(window.location.origin);

    factory.socket.on('connect', function() {
        console.log('I\'m connected!');
    });

    factory.socket.on('eServerNextRound', function(resObj) {
        console.log('Round ' + resObj.round + ': location at ' + resObj.locale);
    });

    factory.joinGame = function(gameName) {
        factory.socket.emit('eClientJoinGame', gameName);
    };

    factory.newGame = function() {
        factory.socket.emit('eClientNewGame');
    };

    return factory;
});
