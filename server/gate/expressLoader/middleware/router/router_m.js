var MicroserverApiClient = global.MicroserverApiClient;
var ApiRequestCount = global.ApiRequestCount;
var resQueue = global.resQueue;

var makePacket = require('./makePacket');

module.exports = function(router) {
    router.route('/loginform').get(function(req, res) {
        if (req.session.userInfo) {
            res.redirect('/');
        } else {
            context = { title: "login form", userInfo: { _id: null } }
            res.render('loginform', context, function(err, html) {
                res.writeHead(200, { 'Content-type': 'text/html; utf8' });
                res.end(html);
            })
        }
    });

    router.route('/login').post(function(req, res) {
        resQueue[resQueue.Numbering] = res;
        res.template = "login";
        res.req = req;
        var Api = req.method + req.url;
        var packet = makePacket(
            resQueue.Numbering,
            req.method,
            req.url, { id: req.body.id, pw: req.body.pw }
        );

        if (!MicroserverApiClient[Api] || MicroserverApiClient[Api].length === 0) {
            printwaitinfo(Api, res);
            return;
        }

        MicroserverApiClient[Api][ApiRequestCount[Api] % MicroserverApiClient[Api].length].client.write(packet);
        ApiRequestCount[Api]++;
        resQueue.Numbering++;
    });

    router.route('/loginfail').get(function(req, res) {
        res.render('loginfail', function(err, html) {
            res.writeHead(200, { 'Content-type': 'text/html; utf8' });
            res.end(html);
        })
    });

    router.route('/logout').get(function(req, res) {
        req.session.destroy();
        res.redirect('/')
    });

    router.route('/registmemberform').get(function(req, res) {
        context = { title: "regist member form", userInfo: { _id: null } }
        res.render('registmemberform', context, function(err, html) {
            res.writeHead(200, { 'Content-type': 'text/html; utf8' });
            res.end(html);
        })
    });

    router.route('/authid').get(function(req, res) {
        resQueue[resQueue.Numbering] = res;
        res.template = "authid";
        res.context = {};
        var urlParser = req.url.split("?");
        var url = urlParser[0]
        var Api = req.method + url;
        var packet = makePacket(
            resQueue.Numbering,
            req.method,
            url, { id: req.query.id }
        );

        if (!MicroserverApiClient[Api] || MicroserverApiClient[Api].length === 0) {
            printwaitinfo(Api, res);
            return;
        }

        MicroserverApiClient[Api][ApiRequestCount[Api] % MicroserverApiClient[Api].length].client.write(packet);
        ApiRequestCount[Api]++;
        resQueue.Numbering++;
    });

    router.route('/member').post(function(req, res) {
        resQueue[resQueue.Numbering] = res;
        res.template = "registmembersuccess"
        res.context = { title: "resist member success", id: req.body.id }
        var Api = req.method + req.url;
        var packet = makePacket(
            resQueue.Numbering,
            req.method,
            req.url, { id: req.body.id, pw: req.body.pw, name: req.body.name }
        )

        if (!MicroserverApiClient[Api] || MicroserverApiClient[Api].length === 0) {
            printwaitinfo(Api, res);
            return;
        }

        MicroserverApiClient[Api][0].client.write(packet);
        resQueue.Numbering++;
    });


    router.route('/updatememberform').get(function(req, res) {
        if (!req.session.userInfo._id) {
            res.redirect('/');
        } else {
            context = { title: "update member form", userInfo: req.session.userInfo }
            res.render('updatememberform', context, function(err, html) {
                res.writeHead(200, { 'Content-type': 'text/html; utf8' });
                res.end(html);
            })
        }
    });

    router.route('/member').put(function(req, res) {
        req.session.destroy();
        resQueue[resQueue.Numbering] = res;
        var urlParser = req.url.split("?");
        var url = urlParser[0]
        res.template = "updatemembersuccess"
        res.context = { title: "update member success", id: req.body.id }
        var Api = "PUT" + url;
        var packet = makePacket(
            resQueue.Numbering,
            "PUT",
            url, { id: req.body.id, pw: req.body.pw }
        )

        if (!MicroserverApiClient[Api] || MicroserverApiClient[Api].length === 0) {
            printwaitinfo(Api, res);
            return;
        }

        MicroserverApiClient[Api][0].client.write(packet);
        resQueue.Numbering++;

    });
    router.route('/member/:id').delete(function(req, res) {
        resQueue[resQueue.Numbering] = res;
        var urlParser = req.url.split("?");
        var url = urlParser[0]
        var baseUrl = "/" + url.split("/")[1]
        res.template = "deletemembersuccess"
        res.context = { title: "delete member success", id: req.params.id }
        var Api = "DELETE" + baseUrl;
        var packet = makePacket(
            resQueue.Numbering,
            "DELETE",
            baseUrl, { id: req.params.id }
        )

        if (!MicroserverApiClient[Api] || MicroserverApiClient[Api].length === 0) {
            printwaitinfo(Api, res);
            return;
        }

        MicroserverApiClient[Api][0].client.write(packet);
        resQueue.Numbering++;
    });
}

function printwaitinfo(Api, res) {
    res.render('waitinfo', function(err, html) {
        res.writeHead(200, { 'Content-type': 'text/html; utf8' });
        res.end(html);
    });
}