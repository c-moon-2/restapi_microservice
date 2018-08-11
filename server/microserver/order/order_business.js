const DAOorder = require('./dao_order');

module.exports = (method, uri, params, callback) => {
    switch (method) {
        case "GET":
            listOrder(params, (response) => {
                process.nextTick(callback, response);
            })
            break;
        case "POST":
            registOrder(params, (response) => {
                process.nextTick(callback, response);
            })
            break;
        case "DELETE":
            deleteOrder(params, (response) => {
                process.nextTick(callback, response);
            })
            break;
    }
}

function listOrder(params, callback) {
    DAOorder.listOrder(params.orderId, callback)
}

function registOrder(params, callback) {
    DAOorder.registOrder(params.orderId, params.orderGoodsnum, params.orderGoodsname, params.orderGoodsquantity, params.orderGoodspaymentprice, params.orderGoodsthumbnail, callback);
}

function deleteOrder(params, callback) {
    DAOorder.deleteOrder(params.orderNum, callback);
}