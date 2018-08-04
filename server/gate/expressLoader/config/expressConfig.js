var options = {
    'view engine': 'ejs',
    'views': './ejs'
};

module.exports = function(app) {
    for (optionKey in options) {
        app.set(optionKey, options[optionKey]);
    }
}