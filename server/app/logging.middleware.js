'use strict'

var express = require('express');
var router = express.Router();
var morgan = require('morgan');

router.use(morgan(':method :url :status :response-time ms - :res[content-length]'));

module.exports = router;