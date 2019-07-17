"use strict";

var db = require("./db"),
    path = require("path"),
    api = require("./api"),
    config = require("config"),
    utils = require("./utils"),
    express = require("express"),
    bodyParser = require("body-parser"),
    cookieParser = require("cookie-parser"),
    expressSession = require("express-session"),
    fs = require('fs'),
    stripWhitespace = require('strip-whitespace'),
    https = require('https');

var app = express();


var jsonParser = bodyParser.json({limit: 1024 * 1024 * 20, type: 'application/json'});
var urlencodedParser = bodyParser.urlencoded({extended: true, limit: 1024 * 1024 * 20, type: 'application/x-www-form-urlencoding'})

app.use(jsonParser);
app.use(urlencodedParser);


app.use(cookieParser());
app.use(expressSession({
    secret: "Flatmanagement",
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname, "../www")));
//app.use(utils.logger.attachLogger());
app.use(api.router);
/*app.use(function (error, req, res, next) {
    var logger = req.log || utils.logger.getLogger();
    logger.error(error);
    res.json(utils.errors["500"]);
});*/


function runServer() {
    db.init();
    api.init();
    var port = process.env.PORT || 80;
    app.listen(port, function () {
        console.info("Application listening on port " + port);
    });
}

runServer();