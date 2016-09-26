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

    let canvas = new fabric.StaticCanvas('canvas');
    fabric.loadSVGFromURL('/worldmap.svg', function(obj, opts) {
        let o = fabric.util.groupSVGElements(obj, {
            width: 500, height: 500
        });
        canvas.add(o).renderAll();
    });
});
