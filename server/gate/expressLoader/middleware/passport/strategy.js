var passport = require('passport');
//var mysql = require('../../../mysql/mysql_init');

var LocalStrategy = require('passport-local').Strategy;

/*passport.use('local-login', new LocalStrategy({
    usernameField: 'id',
    passwordField: 'pw',
    passReqToCallback: true
}, function(req, id, pw, done) {
    mysql.getUserinfo(id, pw, (err, result) => {
        if (err) {
            console.log(err);
            return done(null, false, req.flash('login-fail', 'ID 또는 PW가 일치하지 않습니다.'))
        }
        userInfo = { id: id };
        return done(null, userInfo);
    });
}));*/

module.exports = passport;