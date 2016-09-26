'use strict';

var express = require('express');
var router = express.Router();
var path = require('path');

let rootPath = path.join(__dirname, '..', '..');
let publicPath = path.join(rootPath, 'public');

router.get('/*', function(req, res) {
    res.status(200).sendFile(path.join(publicPath, 'index.html'));
});

module.exports = router;