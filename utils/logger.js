"use strict";

var config = require("config"),
    bunyan = require("bunyan"),
    expressBunyanLogger = require("express-bunyan-logger");

var defaultLogger;

function getLogger(opts) {
    opts = opts || {};
    opts.src = true;
    opts.name = config.get("appName");
    if (config.has("fileRotation")) {
        opts.streams = [config.get("fileRotation")];
    }

    if (!defaultLogger) {
        defaultLogger = bunyan.createLogger(opts);
    }

    return defaultLogger;
}

function attachLogger() {
    var opts = {};

    opts.src = true;
    opts.name = config.get("appName");
    if (config.has("fileRotation")) {
        opts.streams = [config.get("fileRotation")];
    }

    return expressBunyanLogger(opts);
}

exports.getLogger = getLogger;
exports.attachLogger = attachLogger;
