//var passport = require('../passport/strategy');

var MicroserverApiClient = global.MicroserverApiClient;
var resQueue = global.resQueue;

var makePacket = require('./makePacket');

module.exports = function(router) {
    router.route('/login').post(function(req, res) {
        resQueue[resQueue.Numbering] = res;
        var Api = req.method + req.url;
        var packet = makePacket(
            resQueue.Numbering,
            req.method,
            req.url, { id: "asdf", pw: "asdf" }
        )
        MicroserverApiClient[Api][0].client.write(packet);
        resQueue.Numbering++;
    });

    router.route('/member').post(function(req, res) {
        resQueue[resQueue.Numbering] = res;
        var Api = req.method + req.url;
        var packet = makePacket(
            resQueue.Numbering,
            req.method,
            req.url, { id: "aaa", pw: "aaa", name: "qwer" }
        )
        MicroserverApiClient[Api][0].client.write(packet);
        resQueue.Numbering++;
    });
    router.route('/member').put(function(req, res) {
        resQueue[resQueue.Numbering] = res;
        var Api = req.method + req.url;
        var packet = makePacket(
            resQueue.Numbering,
            req.method,
            req.url, { id: "aaa", pw: "bbb" }
        )
        MicroserverApiClient[Api][0].client.write(packet);
        resQueue.Numbering++;
    });
    router.route('/member').delete(function(req, res) {
        resQueue[resQueue.Numbering] = res;
        var Api = req.method + req.url;
        var packet = makePacket(
            resQueue.Numbering,
            req.method,
            req.url, { id: "aaa" }
        )
        MicroserverApiClient[Api][0].client.write(packet);
        resQueue.Numbering++;
    });
    //////////////////////////////////////////////////////////////////
    router.route('/goods').get(function(req, res) {
        resQueue[resQueue.Numbering] = res;
        var Api = req.method + req.url;
        var packet = makePacket(
            resQueue.Numbering,
            req.method,
            req.url
        )
        MicroserverApiClient[Api][0].client.write(packet);
        resQueue.Numbering++;
    });

    router.route('/goods/:goodsNum').get(function(req, res) {
        var pathArray = req.url.split('/');

        resQueue[resQueue.Numbering] = res;
        var Api = req.method + "/" + pathArray[1];
        var packet = makePacket(
            resQueue.Numbering,
            req.method,
            "/" + pathArray[1], { goodsNum: req.params.goodsNum }
        )
        MicroserverApiClient[Api][0].client.write(packet);
        resQueue.Numbering++;
    });
    router.route('/goods').post(function(req, res) {
        resQueue[resQueue.Numbering] = res;
        var Api = req.method + req.url;
        var packet = makePacket(
            resQueue.Numbering,
            req.method,
            req.url, { goodsName: 'b', goodsPrice: 2, goodsThumbnail: 'b', goosinfoimage: 'b' }
        );
        MicroserverApiClient[Api][0].client.write(packet);
        resQueue.Numbering++;
    });
    router.route('/goods').put(function(req, res) {
        resQueue[resQueue.Numbering] = res;
        var Api = req.method + req.url;
        var packet = makePacket(
            resQueue.Numbering,
            req.method,
            req.url, { goodsNum: 3, goodsName: 'c', goodsPrice: 3, goodsThumbnail: 'c', goosinfoimage: 'c' }
        );
        MicroserverApiClient[Api][0].client.write(packet);
        resQueue.Numbering++;
    });
    router.route('/goods').delete(function(req, res) {
        resQueue[resQueue.Numbering] = res;
        var Api = req.method + req.url;
        var packet = makePacket(
            resQueue.Numbering,
            req.method,
            req.url, { goodsNum: 3 }
        );
        MicroserverApiClient[Api][0].client.write(packet);
        resQueue.Numbering++;
    });
    //////////////////////////////////////////////////////////////////
    router.route('/order').get(function(req, res) {
        resQueue[resQueue.Numbering] = res;
        var Api = req.method + req.url;
        var packet = makePacket(
            resQueue.Numbering,
            req.method,
            req.url, { orderId: "a" }
        )
        MicroserverApiClient[Api][0].client.write(packet);
        resQueue.Numbering++;
    });
    router.route('/order').post(function(req, res) {
        resQueue[resQueue.Numbering] = res;
        var Api = req.method + req.url;
        var packet = makePacket(
            resQueue.Numbering,
            req.method,
            req.url, { orderId: "a", orderGoodsname: 'd', orderGoodsquantity: 2, orderGoodspaymentprice: 2, orderGoodsthumbnail: 'd' }
        )
        MicroserverApiClient[Api][0].client.write(packet);
        resQueue.Numbering++;
    });
    router.route('/order').delete(function(req, res) {
        resQueue[resQueue.Numbering] = res;
        var Api = req.method + req.url;
        var packet = makePacket(
            resQueue.Numbering,
            req.method,
            req.url, { orderNum: 3 }
        )
        MicroserverApiClient[Api][0].client.write(packet);
        resQueue.Numbering++;
    });
}