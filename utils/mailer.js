"use strict";

var path = require("path"),
    config = require("config"),
    nodemailer = require("nodemailer"),
    emailTemplates = require("email-templates");

var parsedTemplateDir, templatesDir = path.resolve(__dirname, "emailTemplates"),
    transporter = nodemailer.createTransport(config.get("email.config"));
    
new emailTemplates(templatesDir, function (err, template) {
    if (err) {
        throw err;
    } else {
        parsedTemplateDir = template;
    }
});

function sendEmail(template, options, callback) {
    var mailOptions = {
        from: config.get("email.from"),
        to: options.to
    };
    parsedTemplateDir(template, options, function (err, html, text, sub) {
        if (err) {
            return callback(err);
        }
        mailOptions.html = html;
        mailOptions.text = text;
        mailOptions.subject = sub;
        transporter.sendMail(mailOptions, callback);
    });
}

exports.sendEmail = sendEmail;