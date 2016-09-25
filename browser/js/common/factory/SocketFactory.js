'use strict';

window.app.factory('SocketFactory', function(GeoclientFactory) {
    let factory = {};

    factory.socket = window.io(window.location.origin);

    factory.socket.on('connect', function() {
        console.log('I\'m connected!');
    });

    factory.socket.on('disconect', function() {
        console.log('I\'m connected!');
    });

    factory.socket.on('eServerError', function(resObj) {
        console.log('Server error: ' + resObj.message);
    });

    factory.socket.on('eServerNextRound', function(resObj) {

    });

    factory.socket.on('eServerEndRound', function(resObj) {

    });

    factory.socket.on('eServerEndGame', function(resObj) {
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
