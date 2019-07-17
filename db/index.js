"use strict";

var connection = require("./connection");
function init() {
    connection.getConnection(); // initializing connection
}


exports.init = init;
exports.getdaata = connection;
