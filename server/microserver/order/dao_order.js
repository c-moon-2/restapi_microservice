const mysql = require('mysql');

var pool = mysql.createPool({
    host: '192.168.0.11',
    user: 'microdba',
    password: 'qwer1234!',
    database: 'microprojectdb',
    charset: 'utf8',
    connectionLimit: 10,
    multipleStatements: true
})
pool.query("set time_zone = 'Asia/Seoul'", function(err, results, fields) {});

module.exports = {
    listOrder(orderId, callback) {
        pool.query('select * from orders where _orderid=?', [orderId], (err, results, fields) => {
            if (err) {
                console.log(err);
                callback("err");
            } else if (results.length === 0) {
                callback("fail");
            } else {
                callback(results);
            }
        })
    },
    registOrder(orderId, orderGoodsname, orderGoodsquantity, orderGoodspaymentprice, orderGoodsthumbnail, callback) {
        pool.query('insert into orders set ?', { _orderid: orderId, _ordergoodsname: orderGoodsname, _ordergoodsquantity: orderGoodsquantity, _ordergoodspaymentprice: orderGoodspaymentprice, _ordergoodsthumbnail: orderGoodsthumbnail }, (err, results, fields) => {
            if (err) {
                console.log(err);
                callback("err");
            } else if (!results.insertId) {
                callback("fail");
            } else {
                callback("success");
            }
        })
    },
    deleteOrder(orderNum, callback) {
        pool.query('delete from orders where _ordernum=?', [orderNum], (err, results, fields) => {
            if (err) {
                console.log(err);
                callback("err");
            } else if (results.affectedRows === 0) {
                callback("fail");
            } else {
                callback("success");
            }
        })
    }
}