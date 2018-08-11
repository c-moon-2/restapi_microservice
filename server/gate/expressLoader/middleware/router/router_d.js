var multer = require('multer');

var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, 'ejs/static_image/goods')
    },
    filename: function(req, file, callback) {
        callback(null, file.originalname)
    }
});
var upload = multer({
    storage: storage,
    limits: {
        files: 2,
        fileSize: 100 * 1024 * 1024
    }
});


var MicroserverApiClient = global.MicroserverApiClient;
var ApiRequestCount = global.ApiRequestCount;
var resQueue = global.resQueue;

var makePacket = require('./makePacket');

module.exports = function(router) {

    router.route('/goods').get(function(req, res) {
        resQueue[resQueue.Numbering] = res;
        res.template = "listgoods";
        var url = '/' + req.url.split('/')[1]
        var Api = req.method + url;
        res.context = { title: "goods form", userInfo: req.session.userInfo ? req.session.userInfo : { _id: null } };
        var Api = req.method + url;
        var packet = makePacket(
            resQueue.Numbering,
            req.method,
            url
        )

        if (!MicroserverApiClient[Api] || MicroserverApiClient[Api].length === 0) {
            printwaitinfo(Api, res);
            return;
        }

        MicroserverApiClient[Api][0].client.write(packet);
        resQueue.Numbering++;
    });

    router.route('/goods/:goodsnum').get(function(req, res) {
        resQueue[resQueue.Numbering] = res;
        res.template = "goodsinfo";
        res.context = { title: "goods info", userInfo: req.session.userInfo ? req.session.userInfo : { _id: null } };
        var url = '/' + req.url.split('/')[1]
        var Api = req.method + url;
        var packet = makePacket(
            resQueue.Numbering,
            req.method,
            url, { goodsNum: req.params.goodsnum }
        )

        if (!MicroserverApiClient[Api] || MicroserverApiClient[Api].length === 0) {
            printwaitinfo(Api, res);
            return;
        }

        MicroserverApiClient[Api][0].client.write(packet);
        resQueue.Numbering++;
    });


    router.route('/registgoodsform').get(function(req, res) {
        if (!req.session.userInfo._id) {
            res.redirect('/');
        } else {
            context = { title: "regist goods form", userInfo: req.session.userInfo }
            res.render('registgoodsform', context, function(err, html) {
                res.writeHead(200, { 'Content-type': 'text/html; utf8' });
                res.end(html);
            })
        }
    });


    router.route('/goods').post(upload.fields([{ name: 'goodsimg' }, { name: 'goodsinfoimg' }]), function(req, res) {
        resQueue[resQueue.Numbering] = res;
        res.template = "registgoodssuccess";
        res.context = {};
        var Api = req.method + req.url;
        var packet = makePacket(
            resQueue.Numbering,
            req.method,
            req.url, { goodsName: req.body.goodsname, goodsPrice: parseInt(req.body.goodsprice), goodsThumbnail: req.files.goodsimg[0].originalname, goodsinfoimage: req.files.goodsinfoimg[0].originalname }
        );

        if (!MicroserverApiClient[Api] || MicroserverApiClient[Api].length === 0) {
            printwaitinfo(Api, res);
            return;
        }

        MicroserverApiClient[Api][ApiRequestCount[Api] % MicroserverApiClient[Api].length].client.write(packet);
        ApiRequestCount[Api]++;
        resQueue.Numbering++;
    });


    router.route('/updategoodsform/:goodsnum').get(function(req, res) {
        resQueue[resQueue.Numbering] = res;
        res.template = "updategoodsform";
        res.context = { title: "update goods form", userInfo: req.session.userInfo ? req.session.userInfo : { _id: null } };
        var url = '/goods';
        var Api = req.method + url;
        var packet = makePacket(
            resQueue.Numbering,
            req.method,
            url, { goodsNum: req.params.goodsnum }
        )

        if (!MicroserverApiClient[Api] || MicroserverApiClient[Api].length === 0) {
            printwaitinfo(Api, res);
            return;
        }

        MicroserverApiClient[Api][0].client.write(packet);
        resQueue.Numbering++;
    });

    router.route('/goods').put(upload.fields([{ name: 'goodsimg' }, { name: 'goodsinfoimg' }]), function(req, res) {
        resQueue[resQueue.Numbering] = res;
        var urlParser = req.url.split("?");
        var url = urlParser[0]
        res.template = "updategoodssuccess"
        res.context = { title: "update goods success", id: req.body.id }
        var Api = "PUT" + url;
        var packet = makePacket(
            resQueue.Numbering,
            "PUT",
            url, {
                goodsNum: req.body.goodsnum,
                goodsName: req.body.goodsname,
                goodsPrice: parseInt(req.body.goodsprice),
                goodsThumbnail: req.files.goodsimg ? req.files.goodsimg[0].originalname : null,
                goodsinfoimage: req.files.goodsinfoimg ? req.files.goodsinfoimg[0].originalname : null
            }
        )

        if (!MicroserverApiClient[Api] || MicroserverApiClient[Api].length === 0) {
            printwaitinfo(Api, res);
            return;
        }

        MicroserverApiClient[Api][0].client.write(packet);
        resQueue.Numbering++;

    });

    router.route('/goods/:goodsnum').delete(function(req, res) {
        resQueue[resQueue.Numbering] = res;
        var urlParser = req.url.split("?");
        var url = urlParser[0]
        var baseUrl = "/" + url.split("/")[1]
        res.template = "deletegoodssuccess"
        var Api = "DELETE" + baseUrl;
        res.context = { title: "delete goods success", id: req.params.id }
        var packet = makePacket(
            resQueue.Numbering,
            "DELETE",
            baseUrl, { goodsNum: req.params.goodsnum }
        );

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