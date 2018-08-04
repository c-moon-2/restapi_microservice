var express = require('express');
var expressConfig = require('./config/expressConfig');
var expressMiddleware = require('./middleware/ExpressMiddleware');

var app = express();

expressConfig(app);
expressMiddleware(app);

module.exports = app