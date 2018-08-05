const DAOgoods = require('./dao_goods');

module.exports = (method, uri, params, callback) => {
    switch (method) {
        case "GET":
            if (params) {
                findGoodsinfo(params, (response) => {
                    process.nextTick(callback, response);
                });
            } else {
                listGoods((response) => {
                    process.nextTick(callback, response);
                })
            }
            break;
        case "POST":
            registGoods(params, (response) => {
                process.nextTick(callback, response);
            })
            break;
        case "PUT":
            updateGoods(params, (response) => {
                process.nextTick(callback, response);
            })
            break;
        case "DELETE":
            deleteGoods(params, (response) => {
                process.nextTick(callback, response);
            })
            break;
    }
}

function listGoods(callback) {
    DAOgoods.listGoods(callback)
}

function findGoodsinfo(params, callback) {
    DAOgoods.findGoodsinfo(params.goodsNum, callback)
}

function registGoods(params, callback) {
    DAOgoods.registGoods(params.goodsName, params.goodsPrice, params.goodsThumbnail, params.goodsinfoimage, callback);
}

function updateGoods(params, callback) {
    DAOgoods.updateGoods(params.goodsNum, params.goodsName, params.goodsPrice, params.goodsThumbnail, params.goodsinfoimage, callback);
}

function deleteGoods(params, callback) {
    DAOgoods.deleteGoods(params.goodsNum, callback);
}