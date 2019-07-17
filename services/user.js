"use strict";

var _ = require("lodash"),
  db = require("../db"),
  async = require("async");
var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

var VerifyToken = require("../auth/VerifyToken");

router.use(bodyParser.urlencoded({ extended: true }));

function user() {}

user.newreg = function(userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\'
  executor
    .one(
      'INSERT INTO public."user"( "name", "emailId","phoneNo", "password", "dob", "gender")VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
      [
        userInput.name,
        userInput.emailId,
        userInput.phoneNo,
        userInput.password,
        userInput.dob,
        userInput.gender
      ]
    )
    .then(data => {
      resultCallback(null, data);
    })
    .catch(error => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
user.userlogin = function(userInput, resultCallback) {
  console.log(userInput);
  var executor = db.getdaata.getdb();
  executor
    .any(
      'SELECT * FROM public."user" WHERE "emailId"=$1 and  "password"  =$2 ',
      [userInput.userId, userInput.password]
    )
    .then(data => {
      console.log(data.length);
      if (data.length > 0) {
        resultCallback(null, data);
      } else {
        executor
          .any(
            'SELECT * FROM public."user" WHERE "phoneNo"=$1 and  "password"  =$2 ',
            [userInput.userId, userInput.password]
          )
          .then(data => {
            console.log(data.length);
            if (data.length > 0) {
              resultCallback(null, data);
            } else if (data.length == 0) {
              executor
                .any(
                  'SELECT * FROM public."user"  where "emailId"=$1 or "phoneNo"=$1 ',
                  [userInput.userId]
                )
                .then(data => {
                  console.log(data.length);
                  if (data.length == 0) {
                    var data = "Customer Account Not Found";
                    resultCallback(null, data);
                  } else {
                    if (data.password != userInput.password) {
                      var data = "Invalid Password";
                      resultCallback(null, data);
                    }
                  }
                })
                .catch(error => {
                  resultCallback(error, null);
                  console.log("ERROR:", error);
                });
            }
          })
          .catch(error => {
            resultCallback(error, null);
            console.log("ERROR:", error);
          });
      }
    })
    .catch(error => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
user.listuser = function(userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('SELECT * from public."user"', [])
    .then(data => {
      resultCallback(null, data);
    })
    .catch(error => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
user.sendfriendreq = function(userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\'
  executor
    .one(
      'INSERT INTO public."friend_list"( "user_id", "req_id","status")VALUES ($1,$2,$3) RETURNING *',
      [userInput.user_id, userInput.req_id, "Request"]
    )
    .then(data => {
      resultCallback(null, data);
    })
    .catch(error => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
user.updatefriendreq = function(userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\'
  executor
    .one(
      'UPDATE public."friend_list" SET   "status"=$3 WHERE  "user_id"=$1 and "req_id"=$2 RETURNING *',
      [userInput.user_id, userInput.req_id, userInput.status]
    )
    .then(data => {
      resultCallback(null, data);
    })
    .catch(error => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
user.reqlistfrnd = function(userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\'
  executor
    .any(
      'SELECT "b".user_id,"b".name,"b"."emailId","b"."phoneNo","b"."password","b".dob,"b".gender FROM "friend_list" as "a" left join "user" as "b" on "a".req_id = "b".user_id  where "a".status=($2) and "a".user_id=($1)',
      [userInput.user_id, userInput.status]
    )
    .then(data => {
      resultCallback(null, data);
    })
    .catch(error => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
module.exports = user;
