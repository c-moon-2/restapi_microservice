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
    listGoods(callback) {
        pool.query('select _goodsnum, _goodsname, _goodsprice, _goodsThumbnail from goods', (err, results, fields) => {
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
    findGoodsinfo(goodsNum, callback) {
        pool.query('select * from goods where _goodsNum=?', [goodsNum], (err, results, fields) => {
            if (err) {
                console.log(err);
                callback("err");
            } else if (results.length !== 1) {
                callback("fail");
            } else {
                callback(results[0]);
            }
        })
    },
    registGoods(goodsName, goodsPrice, goodsThumbnail, goodsinfoimage, callback) {
        pool.query('insert into goods set ?', { _goodsname: goodsName, _goodsprice: goodsPrice, _goodsthumbnail: goodsThumbnail, _goodsinfoimage: goodsinfoimage }, (err, results, fields) => {
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
    updateGoods(goodsNum, goodsName, goodsPrice, goodsThumbnail, goodsinfoimage, callback) {
        pool.query('update goods set ? where _goodsnum=?', [{ _goodsname: goodsName, _goodsprice: goodsPrice, _goodsthumbnail: goodsThumbnail, _goodsinfoimage: goodsinfoimage }, goodsNum], (err, results, fields) => {
            if (err) {
                console.log(err);
                callback("err");
            } else if (results.changedRows === 0) {
                callback("fail");
            } else {
                callback("success");
            }
        })
    },
    deleteGoods(goodsNum, callback) {
        pool.query('delete from goods where _goodsnum=?', [goodsNum], (err, results, fields) => {
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