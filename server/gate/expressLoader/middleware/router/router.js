var express = require('express');

var router = express.Router();

global.MicroserverApiClient = {};
global.ApiRequestCount = {};
global.resQueue = { Numbering: 0 }

router.route('/').get(function(req, res) {
    context = { title: "Battle Rentacar", userInfo: null }
    if (req.session.userInfo) {
        context.userInfo = req.session.userInfo;
    }
    res.render('index', context, function(err, html) {
        res.writeHead(200, { 'Content-type': 'text/html; utf8' });
        res.end(html);
    })
})

router.route('/introduction').get(function(req, res) {
    context = { title: "Battle Rentacar - Introduction" }
    res.render('introduction', context, function(err, html) {
        res.writeHead(200, { 'Content-type': 'text/html; utf8' });
        res.end(html);
    })
})

require('./router_m')(router);

module.exports = {
    F_router: {
        path: '/',
        middleware: router
    }
}