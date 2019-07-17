"use strict";

const promise = require('bluebird'); // or any other Promise/A+ compatible library;

const initOptions = {
    promiseLib: promise // overriding the default (ES6 Promise);
};

const pgp = require('pg-promise')(initOptions);
const monitor = require('pg-monitor');

monitor.attach(initOptions); // attach to all query events;

monitor.setTheme('matrix'); // change the default theme;

monitor.setLog((msg, info) => {
});
var db;
function getConnection() {
    const cn = {
	  user: "hjtflnhvmndglx",
	  password: "f4c9bec303065dc86083af4f06b8c0117426e68e735e7cf35ab198dd2a35e4e5",
	  database: "d8pbo74kjkbg28",
	  port: 5432,
	  host: "ec2-54-83-201-84.compute-1.amazonaws.com",
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