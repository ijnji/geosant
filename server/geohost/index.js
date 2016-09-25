'use strict';

const shortid = require('shortid');

const STATE_WAITING = 0;
const STATE_PLAYING = 1;
const STATE_FINISHED = 2;
const LOCALES = require('./locales.js');

let geohost = {};
geohost.games = {};
geohost.socketToGame = {};
geohost.openGames = [];

geohost.emitError = function(socket, message) {
    message = message || '';
    socket.emit('eServerError', {
        message: message
    });
}

geohost.onDisconnect = function(socket) {
    console.log(socket.id + ' disconnected');
    let gameId = geohost.socketToGame[socket.id];
    if (gameId) geohost.endGame(gameId);
};

geohost.onNewGame = function(socket) {
    let gameId = shortid.generate();
    geohost.games[gameId] = {
        id: gameId,
        state: STATE_WAITING,
        locale: 0,
        round: 0,
        guesses: {}, // Key is socket.id
        sockets: [ socket ]
    };
    geohost.socketToGame[socket.id] = gameId;
    geohost.openGames.push(gameId);
    console.log(socket.id + ' created game ' + gameId);
}

geohost.getRandomOpenGameIndex = function() {
    if (geohost.openGames.length === 0) return -1;
    let r = Math.floor(Math.random() * geohost.openGames.length);
    return r;
}

geohost.onJoinGame = function(socket, gameId) {
    if (!gameId) {
        console.log(socket.id + ': wants to join any game');
        let openGameIndex = geohost.getRandomOpenGameIndex();
        if (openGameIndex === -1) {
            geohost.emitError(socket, 'No open games');
            return;
        }
        gameId = geohost.openGames[openGameIndex];
        geohost.openGames.splice(openGameIndex, 1);
    } else {
        console.log(socket.id + ': wants to join ' + gameId);
        let openGameIndex = geohost.openGames.indexOf(gameId);
        if (openGameIndex === -1) {
            geohost.emitError(socket, 'Game not available to join');
            return;
        }
        geohost.openGames.splice(openGameIndex, 1);
    }
    geohost.socketToGame[socket.id] = gameId;
    let game = geohost.games[gameId];
    game.sockets.push(socket);
    if (game.sockets.length === 2) {
        game.state = STATE_PLAYING;
        geohost.nextRound(game.id);
    }
};

geohost.nextRound = function(gameId) {
    let game = geohost.games[gameId];
    game.round++;
    game.locale = geohost.randomLocaleIndex();
    game.guessCoords = [];
    game.guessTimeStart = [ new Date(), new Date() ];
    game.guessTimeEnd = [];
    game.sockets.forEach(function(soc) {
        soc.emit('eServerNextRound', {
            round: game.round,
            city: LOCALES[game.state.locale].city,
            country: LOCALES[game.state.locale].country,
        });
    });
    game.timeout = setTimeout(geohost.endRound, 1000, game.id);
};

geohost.endRound = function(gameId) {
    let game = geohost.games[gameId];
    clearTimeout(game.timeout);
    game.sockets.forEach(function(soc, idx) {
        soc.emit('eServerEndRound', {
            self: idx,
            guessCoords: game.guessCoords,
            guessTimeStart: game.guessTimeStart,
            guessTimeEnd: game.guessTimeEnd
        });
    });
    if (game.round < 10) {
        geohost.nextRound(game.id);
    } else {
        game.state = STATE_FINISHED;
        geohost.endGame(game.id);
    }
};

geohost.endGame = function(gameId) {
    let game = geohost.games[gameId];
    if (!game) return;
    game.sockets.forEach(function(soc) {
        soc.emit('eServerGameEnd');
        delete(geohost.socketToGame[soc]);
    });
    delete(geohost.games[game]);
}

geohost.randomLocaleIndex = function() {
    let max = LOCALES.length;
    let r = Math.floor(Math.random() * max);
    return r;
}

module.exports = geohost;