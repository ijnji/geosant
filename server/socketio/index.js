'use strict';

let socketio = require('socket.io');
let io = undefined;

module.exports = function(server) {
    if (io) return io;
    io = socketio(server);
    io.on('connection', (socket) => {
        let room;
        socket.on('disconnect', () => {
            console.log('User has disconnected.');
        });
        // socket.on('wantToJoinRoom', (roomName) => {
        //     room = roomName;
        //     socket.join(room);
        // });
    });
    return io;
};