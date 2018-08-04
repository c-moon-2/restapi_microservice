middlewares = {
    static: require('./static'),
    bodyParser: require('./bodyParser'),
    cors: require('./cors'),
    session: require('./session'),
    passport: require('./passport/passport_init'),
    router: require('./router/router'),
}

module.exports = function(app) {
    for (F_s in middlewares) {
        for (F_ in middlewares[F_s]) {
            app.use(middlewares[F_s][F_].path, middlewares[F_s][F_].middleware);
        }
    }
}