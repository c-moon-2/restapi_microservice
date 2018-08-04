var passport = require('passport');
var flash = require('connect-flash');

passport.serializeUser(function(id, done) {
    done(null, id);
})

passport.deserializeUser(function(id, done) {
    done(null, id);
})

module.exports = {
    F_initialize: {
        path: '',
        middleware: passport.initialize()
    },
    F_session: {
        path: '',
        middleware: passport.session()
    },
    F_flash: {
        path: '',
        middleware: flash()
    }
}