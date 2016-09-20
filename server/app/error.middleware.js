'use strict';

var express = require('express');
var router = express.Router();
var path = require('path');

let rootPath = path.join(__dirname, '..', '..');
let publicPath = path.join(rootPath, 'public');
let viewPath = path.join(rootPath, 'server', 'app', 'views');

router.use(function(err, req, res, next) {
    err.status = err.status || 500;
    res.status(err.status).sendFile(path.join(viewPath, 'error.html'));
});

router.use(function(req, res, next) {
    res.status(404).sendFile(path.join(viewPath, 'error.html'));
});

module.exports = router;
