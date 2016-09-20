'use strict'

const PORT = process.env.PORT || 3000;

let chalk = require('chalk');
let app = require('./app/index.js');
let server = require('http').createServer();
let io = require('./socketio/index.js');

server.on('request', app);
require('./io')(server);

server.listen(PORT, () => {
    console.log(chalk.blue('Server started on port ')
        + chalk.magenta(PORT));
});