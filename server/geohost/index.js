'use strict';

const STATE_WAITING = 0;
const STATE_PLAYING = 1;
const STATE_FINISHED = 2;
const LOCALES = require('./locales.js').LOCALES;

let geohost = {};
geohost.games = [];

geohost.onDisconnect = function(socket) {
    console.log(socket.id + ' disconnected');
};

geohost.onNewGame = function(socket) {
    geohost.games.push({
        state: {
            status: STATE_WAITING,
            locale: 0,
            round: 0
        },
        sockets: [ socket ]
    });
    console.log(socket.id + ' created game ' + (geohost.games.length - 1));
}

geohost.onJoinGame = function(socket, gameId) {
    console.log(socket.id + ': wants to join ' + gameId);
    let game = geohost.games[gameId];
    if (!game) return false;
    if (game.sockets.length >= 2) return false;
    game.sockets.push(socket);
    if (game.sockets.length === 2) {
        game.state.status = STATE_PLAYING;
        geohost.nextRound(game);
    }
    return true;
};

geohost.nextRound = function(game) {
    if (game.state.status !== STATE_PLAYING) return;
    //if (game.state.round >= 10) return;

    game.state.round++;

    let loc = geohost.randomLocaleIndex();
    game.state.locale = loc;

    game.sockets.forEach(function(socket) {
        socket.emit('eServerNextRound', {
            round: game.state.round,
            locale: LOCALES[game.state.locale]
        });
    });

    setTimeout(geohost.nextRound, 1000, game);
};

geohost.randomLocaleIndex = function() {
    let max = LOCALES.length;
    let r = Math.floor(Math.random() * max);
    return r;
}

module.exports = geohost;