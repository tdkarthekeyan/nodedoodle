"use strict";

var fs = require("fs"),
  _ = require("lodash"),
  async = require("async"),
  config = require("config"),
  uuidv4 = require("uuid/v4"),
  utils = require("../utils"),
  mustache = require("mustache"),
  passport = require("passport"),
  request = require("superagent"),
  services = require("../services");
var base64ToImage = require("base64-to-image");
var uniqid = require("uniqid");
var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var base64UrlEncode = require("base64url");
var jwt = require("jsonwebtoken"); // used to create, sign, and verify tokens
var bcrypt = require("bcryptjs");

//var FORGOT_PASSWORD_HTML = fs.readFileSync("www/resetpassword.html", "utf8");
/*
To Maintain Local Session
*/
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
passport.serializeUser(function(appartment_details, done) {
  done(null, appartment_details);
});

passport.deserializeUser(function(appartment_details, done) {
  done(null, appartment_details);
});
passport.serializeUser(function(flatuser, done) {
  done(null, flatuser);
});

passport.deserializeUser(function(flatuser, done) {
  done(null, flatuser);
});

function init() {}

function register(req, res, next) {
  async.waterfall([
    function(waterfallCallback) {
      services.user.newreg(req.body, function(err, result) {
        if (err) {
          req.log.error(
            {
              error: err
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function(mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata
          },
          utils.errors["200"]
        )
      );
    }
  ]);
}
function login(req, res, next) {
  async.waterfall([
    function(waterfallCallback) {
      services.user.userlogin(req.body, function(err, result) {
        if (err) return res.status(500).send("Error on the server.");
        console.log(result);
        waterfallCallback(null, result);
      });
    },
    function(mydata, waterfallCallback) {
      if (mydata == "Customer Account Not Found") {
        return res.json(_.merge({}, utils.errors["404"]));
      } else if (mydata == "Invalid Password") {
        return res.json(_.merge({}, utils.errors["401"]));
      } else {
        return res.json(
          _.merge(
            {
              data: mydata
            },
            utils.errors["200"]
          )
        );
      }
    }
  ]);
}
function sendfrndreq(req, res, next) {
  async.waterfall([
    function(waterfallCallback) {
      services.user.sendfriendreq(req.body.userId, function(err, result) {
        if (err) {
          req.log.error(
            {
              error: err
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function(mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata
          },
          utils.errors["200"]
        )
      );
    }
  ]);
}
function listfrndreq(req, res, next) {
  async.waterfall([
    function(waterfallCallback) {
      services.user.reqlistfrnd(req.body, function(err, result) {
        if (err) {
          req.log.error(
            {
              error: err
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function(mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata
          },
          utils.errors["200"]
        )
      );
    }
  ]);
}
function updatefrndreq(req, res, next) {
  async.waterfall([
    function(waterfallCallback) {
      services.user.updatefriendreq(req.body, function(err, result) {
        if (err) {
          req.log.error(
            {
              error: err
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function(mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata
          },
          utils.errors["200"]
        )
      );
    }
  ]);
}

exports.init = init;
exports.passport = passport;

exports.register = register;
exports.login = login;
exports.sendfrndreq = sendfrndreq;
exports.listfrndreq = listfrndreq;
exports.updatefrndreq = updatefrndreq;
