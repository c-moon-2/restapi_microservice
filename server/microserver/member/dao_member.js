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
    findMember(id, pw, callback) {
        pool.query('select _id, _name from member where _id=? and _password=password(?)', [id, pw], (err, results, fields) => {
            if (err) {
                console.log(err);
                callback("fail");
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
                callback("fail");
            } else {
                callback("success");
            }
        })
    }
}