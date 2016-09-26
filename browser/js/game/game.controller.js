'use strict';

window.app.controller('GameController', function($scope, $state, SocketFactory) {
    let socket = SocketFactory.socket;

    $scope.state = {};

    if ($state.params.gameId) {
        console.log('Trying to join game ' + $state.params.gameId);
        socket.emit('eClientJoinGame', {
            gameId: $state.params.gameId
        });
    }

    socket.on('eServerNextRound', function(msgObj) {
        console.log('Round ' + msgObj.round);
        console.log('City: ' + msgObj.city);
        console.log('Country: ' + msgObj.country);
        $scope.state.round = msgObj.round;
        $scope.state.city = msgObj.city;
        $scope.state.country = msgObj.country;
        $scope.$digest();
    });

    let R = Raphael('map', 1000, 400);
    let globe = {};
    let attr = {
        fill: '#1E3E52',
        stroke: '#467C9E',
        'stroke-width': 1,
        'stroke-linejoin': 'round'
    };
    let current = undefined;
    for (let cty in WORLDMAP) {
        globe[cty] = R.path(WORLDMAP[cty]).attr(attr);
        (function(c, cty) {
            c[0].style.cursor = 'pointer';
            c[0].onmouseover = function() {
                c.animate({ fill: '#467C9E' }, 500);
                current = cty;
            };
            c[0].onmouseout = function() {
                c.animate({ fill: '#1E3E52', stroke: '#467C9E'}, 500);
            };
        })(globe[cty], cty);
    }

});

