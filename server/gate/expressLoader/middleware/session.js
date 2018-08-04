var session = require('express-session');

module.exports = {
    F_session: {
        path: '',
        middleware: session({
            secret: '#saltValue#',
            resave: true,
            saveUninitialized: true
        })
    }
}