"use strict";
exports.__esModule = true;
var express_1 = require("express");
var app = express_1["default"]();
var port = 3000; // default port to listen
// define a route handler for the default home page
app.get("/", function (req, res) {
    // render the index template
    res.status(200).json({
        message: "Hellow World"
    });
});
// start the express server
app.listen(port, function () {
    // tslint:disable-next-line:no-console
    console.log("server started at http://localhost:" + port);
});
