var bodyParser = require('body-parser');

module.exports = {
    F_urlencoded: {
        path: '',
        middleware: bodyParser.urlencoded({ extended: true })
    },
    F_json: {
        path: '',
        middleware: bodyParser.json()
    }
}