

"use strict";

var _ = require("lodash"),
        db = require("../db"),
        async = require("async");

function flatuser() {}

flatuser.getuser_details = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
   executor.any('SELECT * FROM public.user WHERE user_id=($1) ' , [userInput.user_id])
        .then(data => {

                 
                 console.log(data);
                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })


};


flatuser.add = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
   executor.any('SELECT * FROM public.user WHERE "email_id"=($1) ' , [userInput.email_id])
        .then(data => {
                 if(data.length > 0 )//eruthuchuna
                 {
                  var string = {message:"This email_id already exits!",status:"falied"} ;
                 resultCallback(null,string);
                 
               }else{
                   console.log("2");
                   executor.none('INSERT INTO public.user (flat_no, block_name, user_name, user_phone, password, email_id,owner_tent,type,appartment_name) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9);',
                 [userInput.flat_no,userInput.block_name,userInput.user_name,userInput.user_phone,userInput.password,userInput.email_id,userInput.owner_tent,userInput.type,userInput.appartment_name]),
                  executor.any('SELECT * FROM public.user_login WHERE "email_id"=($1) ' , [userInput.email_id])
                 .then(data => {
              resultCallback(null,data);

                 })

              }
                 
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })


};


module.exports = flatuser;
