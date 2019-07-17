"use strict";

var express = require("express"),
  cors = require("cors"),
  utils = require("../utils"),
  jsonschema = require("./jsonschema"),
  middleware = require("./middleware"),
  AuthController = require("../auth/AuthController"),
  VerifyToken = require("../auth/VerifyToken");

var app = express(),
  router = express.Router();

function addRoute(path, method, middlewares) {
  var handlers = [].concat(middlewares);
  handlers.unshift(utils.validator.validate(path, jsonschema));
  router[method.toLowerCase()](path, handlers);
}

app.use("*", [
  cors(),
  middleware.passport.initialize(),
  middleware.passport.session()
]);
app.options("*", cors());

addRoute("/auth/register", "POST", [middleware.register]);
addRoute("/auth/list", "POST", [middleware.list]);
addRoute("/auth/login", "POST", [middleware.login]);
addRoute("/auth/sendfrndreq", "POST", [middleware.sendfrndreq]);
addRoute("/auth/listfrnds_req", "POST", [middleware.listfrndreq]);
addRoute("/auth/updatefrndreq", "POST", [middleware.updatefrndreq]);

app.use(router);

exports.init = middleware.init;
exports.router = app;
