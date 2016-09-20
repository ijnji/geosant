'use strict';

var express = require('express');
var router = express.Router();
var path = require('path');

let rootPath = path.join(__dirname, '..', '..');
let publicPath = path.join(rootPath, 'public');

router.use(express.static(publicPath));

module.exports = router;