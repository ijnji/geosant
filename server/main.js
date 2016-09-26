'use strict';

const PORT = process.env.PORT || 3000;

let chalk = require('chalk');
let app = require('./app/index.js');
let geohost = require('./geohost/index.js');

let server = require('http').createServer();
server.on('request', app);

let io = require('./socketio/index.js')(server);
io.on('connection', function(socket) {

    console.log(chalk.cyan(socket.id + ': connected'));

    socket.on('disconnect', function() {
        geohost.onDisconnect(socket);
    });
    socket.on('eClientCreateGame', function() {
        geohost.onCreateGame(socket);
    })
    socket.on('eClientGetOpenGame', function() {
        geohost.onGetOpenGame(socket);
    });
    socket.on('eClientJoinGame', function(msgObj) {
        geohost.onJoinGame(socket, msgObj.gameId);
    });

});

server.listen(PORT, function() {
    console.log(chalk.blue('Server started on port ')
        + chalk.magenta(PORT));
});