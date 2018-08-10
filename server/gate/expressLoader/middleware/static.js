var Serve_static = require("serve-static");

module.exports = {
    F_static: {
        path: "/",
        middleware: Serve_static("ejs")
    },
    F_static1: {
        path: "/goods",
        middleware: Serve_static("ejs")
    },
    F_static2: {
        path: "/updategoodsform",
        middleware: Serve_static("ejs")
    }
}