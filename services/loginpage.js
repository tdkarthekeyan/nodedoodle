"use strict";

var _ = require("lodash"),
        db = require("../db"),
        async = require("async");

function login_page() {}




login_page.login = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
   executor.any('SELECT * FROM public.flat_admin WHERE "email_id"=($1) ' , [userInput.email_id,userInput.password])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })


};

//loginprocess
login_page.loginpage = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 

//   select * from appartment_details where appartment_id in (
// select "flatId" from flatadmin where "email" = 'iqbal@gmail.com'
// )
   executor.any('SELECT * FROM appartment_details WHERE "email_id"=($1) ' , [userInput.email_id,userInput.password])
   // executor.any('SELECT * FROM appartment_details WHERE appartment_id in (select "flatId" from flatadmin where "email" = ($1))',[userInput.email_id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })


};






module.exports = login_page;