var MicroserverApiClient = global.MicroserverApiClient;
var ApiRequestCount = global.ApiRequestCount;
var resQueue = global.resQueue;

var makePacket = require('./makePacket');

module.exports = function(router) {

    router.route('/order').get(function(req, res) {
        resQueue[resQueue.Numbering] = res;
        res.template = "listorder";
        res.context = { title: "order list", userInfo: req.session.userInfo ? req.session.userInfo : { _id: null } };
        var Api = req.method + req.url;
        var packet = makePacket(
            resQueue.Numbering,
            req.method,
            req.url, { orderId: req.session.userInfo ? req.session.userInfo._id : null }
        )

        if (!MicroserverApiClient[Api] || MicroserverApiClient[Api].length === 0) {
            printwaitinfo(Api, res);
            return;
        }

        MicroserverApiClient[Api][0].client.write(packet);
        resQueue.Numbering++;
    });

    router.route('/order').post(function(req, res) {
        resQueue[resQueue.Numbering] = res;
        var Api = req.method + req.url;
        res.template = "orderssuccess";
        res.context = {};
        var packet = makePacket(
            resQueue.Numbering,
            req.method,
            req.url, {
                orderId: req.body.orderid,
                orderGoodsnum: req.body.ordergoodsnum,
                orderGoodsname: req.body.ordergoodsname,
                orderGoodsquantity: parseInt(req.body.ordergoodsquantity),
                orderGoodspaymentprice: parseInt(req.body.ordergoodsgoodspaymentprice) * parseInt(req.body.ordergoodsquantity),
                orderGoodsthumbnail: req.body.ordergoodsthumbnail
            }
        )

        if (!MicroserverApiClient[Api] || MicroserverApiClient[Api].length === 0) {
            printwaitinfo(Api, res);
            return;
        }

        MicroserverApiClient[Api][0].client.write(packet);
        resQueue.Numbering++;
    });

    router.route('/order/:ordernum').delete(function(req, res) {
        resQueue[resQueue.Numbering] = res;
        var urlParser = req.url.split("?");
        var url = urlParser[0]
        var baseUrl = "/" + url.split("/")[1]
        res.template = "cancelordersuccess"
        var Api = "DELETE" + baseUrl
        res.context = { title: "cancel order success", id: req.params.id }
        var packet = makePacket(
            resQueue.Numbering,
            "DELETE",
            baseUrl, { orderNum: req.params.ordernum }
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