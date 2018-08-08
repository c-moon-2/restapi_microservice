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
    authId(id, callback) {
        pool.query('select _id from member where _id=?', [id], (err, results, fields) => {
            if (err) {
                console.log(err);
                callback("err");
            } else if (results.length !== 0) {
                callback("fail");
            } else {
                callback("success");
            }
        })
    },
    findMember(id, pw, callback) {
        pool.query('select _id, _name from member where _id=? and _password=password(?)', [id, pw], (err, results, fields) => {
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
    registMember(id, pw, name, callback) {
        pool.query('insert into member set _id=?, _password=password(?), _name=? ', [id, pw, name], (err, results, fields) => {
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
    updateMember(id, pw, callback) {
        pool.query('update member set _password=password(?) where _id=?', [pw, id], (err, results, fields) => {
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
    deleteMember(id, callback) {
        pool.query('delete from member where _id=?', [id], (err, results, fields) => {
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