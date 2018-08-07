var express = require('express');

var router = express.Router();

global.MicroserverApiClient = {};
global.ApiRequestCount = {};
global.resQueue = { Numbering: 0 }

router.route('/').get(function(req, res) {
    context = { title: "Maru Developer" }
    res.render('index', context, function(err, html) {
        res.writeHead(200, { 'Content-type': 'text/html; utf8' });
        res.end(html);
    })
})

require('./router_test')(router);
require('./router_m')(router);

module.exports = {
    F_router: {
        path: '/',
        middleware: router
    }
}