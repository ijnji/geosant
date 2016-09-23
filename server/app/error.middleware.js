'use strict';

var express = require('express');
var router = express.Router();
var path = require('path');

let rootPath = path.join(__dirname, '..', '..');
let publicPath = path.join(rootPath, 'public');

router.use(function(err, req, res, next) {
    err.status = err.status || 500;
    res.status(err.status).sendFile(path.join(publicPath, 'error.html'));
});

router.use(function(req, res, next) {
    res.status(404).sendFile(path.join(publicPath, 'error.html'));
});

module.exports = router;
