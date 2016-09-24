'use strict';

let socketio = require('socket.io');
let io = undefined;

module.exports = function(server) {
    if (io) return io;
    io = socketio(server);
    return io;
};
