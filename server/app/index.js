'use strict';

var express = require('express');
var app = express();
var path = require('path');

let rootPath = path.join(__dirname, '..', '..');
let publicPath = path.join(rootPath, 'public');

app.use(require('./logging.middleware.js'));
app.use(require('./statics.middleware.js'));
app.use(require('./routing.middleware.js'));
app.use(require('./error.middleware.js'));

module.exports = app;