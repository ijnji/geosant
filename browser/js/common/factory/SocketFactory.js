'use strict';

window.app.factory('SocketFactory', function() {
    let factory = {};

    factory.socket = window.io(window.location.origin);
    if (!factory.socket) throw new Error('Socket.io not found.');
    
    factory.socket.on('connect', () => {
        console.log('I\'m connected!');
    });

    return factory;
});