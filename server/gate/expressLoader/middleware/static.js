var Serve_static = require("serve-static");

module.exports = {
    F_static: {
        path: "/",
        middleware: Serve_static("ejs")
    },
}