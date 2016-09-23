'use strict';

window.app.factory('SocketFactory', function() {
    let factory = {};

    factory.socket = window.io(window.location.origin);
    factory.socket.on('connect', function() {
        console.log('I\'m connected!');
    });

    return factory;
});
