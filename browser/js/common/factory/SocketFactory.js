'use strict';

window.app.factory('SocketFactory', function() {
    let factory = {};

    factory.socket = window.io(window.location.origin);

    factory.socket.on('connect', function() {
        console.log('Socket connected to server');
    });

    factory.socket.on('disconect', function() {
        console.log('Socket disconnected from server');
    });

    factory.socket.on('eServerError', function(msgObj) {
        console.log('Server error: ' + msgObj.message);
    });

    factory.socket.on('eServerMessage', function(msgObj) {
        console.log('Server message: ' + msgObj.message);
    });

    return factory;
});