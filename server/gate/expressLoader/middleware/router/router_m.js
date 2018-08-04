//var passport = require('../passport/strategy');

var MicroserverApiClient = global.MicroserverApiClient;
var resQueue = global.resQueue;

module.exports = function(router) {
    router.route('/login').post(function(req, res) {
        resQueue[resQueue.Numbering] = res;
        var Api = req.method + req.url;
        var packet = {
            identifyNum: resQueue.Numbering,
            method: req.method,
            uri: req.url,
            params: { id: "asdf", pw: "asdf" }
        }
        MicroserverApiClient[Api][0].client.write(packet);
        resQueue.Numbering++;
    });

    /*router.route('/passport_mysql').get(function(req, res) {
        mysql.getContentList(0, (err, result) => {
            context = { title: "passport_mysql", loginErr: req.flash('login-fail'), sessionId: req.user, contentList: result[1], pagenation: result[0], curPage: 1 }
            res.render('P_M', context, function(err, html) {
                res.writeHead(200, { 'Content-type': 'text/html; utf8' });
                res.end(html);
            })
        })
    });

    router.route('/local_login').post(passport.authenticate('local-login', {
        successRedirect: '/passport_mysql',
        failureRedirect: '/passport_mysql',
        failureFlash: true
    }));

    router.route('/logout').get(function(req, res) {
        req.logout();
        res.redirect('/passport_mysql');
    });

    router.route('/login-fail').get(function(req, res) {
        req.logout();
        res.render('LoginFail', function(err, html) {
            res.writeHead(200, { 'Content-type': 'text/html; utf8' });
            res.end(html);
        })
    });

    router.route('/process-error').get(function(req, res) {
        res.render('ProcessError', function(err, html) {
            res.writeHead(200, { 'Content-type': 'text/html; utf8' });
            res.end(html);
        })
    });*/
}