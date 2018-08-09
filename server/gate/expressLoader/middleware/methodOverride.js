var methodOverride = require('method-override');

module.exports = {
    F_session: {
        path: '',
        middleware: methodOverride('_method')
    }
}