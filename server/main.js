'use strict';

const PORT = process.env.PORT || 3000;

let chalk = require('chalk');
let app = require('./app/index.js');
let geohost = require('./geohost/index.js');

let server = require('http').createServer();
server.on('request', app);

let io = require('./socketio/index.js')(server);
io.on('connection', function(socket) {

    console.log(socket.id + ': connected');

    socket.on('disconnect', function() {
        geohost.onDisconnect(socket);
    });
    socket.on('eClientNewGame', function() {
        geohost.onNewGame(socket);
    })
    socket.on('eClientJoinGame', function(gameName) {
        geohost.onJoinGame(socket, gameName);
    });

});

server.listen(PORT, function() {
    console.log(chalk.blue('Server started on port ')
        + chalk.magenta(PORT));
});