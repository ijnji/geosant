'use strict';

var express = require('express');
var router = express.Router();
var path = require('path');

let rootPath = path.join(__dirname, '..', '..');
let publicPath = path.join(rootPath, 'public');
let viewPath = path.join(rootPath, 'server', 'app', 'views');

router.get('/', function(req, res) {
    res.status(200).sendFile(path.join(viewPath, 'index.html'));
});

module.exports = router;