"use strict";

const promise = require("bluebird"); // or any other Promise/A+ compatible library;

const initOptions = {
  promiseLib: promise // overriding the default (ES6 Promise);
};

const pgp = require("pg-promise")(initOptions);
const monitor = require("pg-monitor");

monitor.attach(initOptions); // attach to all query events;

monitor.setTheme("matrix"); // change the default theme;

monitor.setLog((msg, info) => {});
var db;
function getConnection() {
  const cn = {
    user: "mulupvxdqieynq",
    password:
      "1d59a67c2ff5d56b77c696aec8e01671bf232aef7237a49cce9829f3f302bd81",
    database: "degl7mv8t5ch4a",
    port: 5432,
    host: "ec2-50-16-197-244.compute-1.amazonaws.com",
    ssl: true
  };
  db = pgp(cn);
  return db;
}

function getdb() {
  return db;
}

exports.getdb = getdb;
exports.getConnection = getConnection;
