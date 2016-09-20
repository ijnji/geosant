'use strict';

let app = window.app;

app.factory('SocketFactory', () => {
    let socket = window.io(window.location.origin);
    if (!socket) throw new Error('Socket.io not found.');
    socket.on('connect', () => {
        console.log('I\'m connected!');
    });
    return socket;
});