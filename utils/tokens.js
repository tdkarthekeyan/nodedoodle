"use strict";

var _ = require("lodash"),
    crypto = require("crypto"),
    CryptoJS = require("crypto-js");

var IV_HASH = "55d14ae6-be50-11e7-abc4-cec278b6b50a",
    KEY_HASH = "b6b6eb4d-d7cb-47e1-a471-baacc2407333",
    KEY_JUNK = "b60ce0c7-6cbd-4caa-8603-186483b12e7b";

function generate64ByteToken(key, resultCallback) {
    var token = crypto.createHash("md5").update(key).digest("hex");
	console.log(token);
    if (resultCallback) {
        return resultCallback(null, token);
    }
    return token;
}

function randomString(len) {
    var text = "",
        possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    _.times(len, function () {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    });
    return text;
}

function addRandomSuffix(str) {
    return str + (Math.random() % 1000).toFixed(0);
}

function generateUserTags(userObj, resultCallback) {
    var suggestions = [],
        firstName = userObj.firstName || randomString(3),
        lastName = userObj.lastName || randomString(3),
        middleName = userObj.middleName || "";

    suggestions.push(addRandomSuffix(firstName + "" + lastName));
    suggestions.push(addRandomSuffix(firstName.substr(0, 1) + "" + lastName));
    suggestions.push(addRandomSuffix(firstName + middleName + lastName));

    _.times(30, function () {
        suggestions.push(addRandomSuffix(userObj.userTag));
    });
    return resultCallback(null, suggestions);
}

function encryptPassword(password, salt, resultCallback) {
    crypto.pbkdf2(password, salt, 100000, 128, "sha512", function (err, derivedKey) {
        if (err) {
            return resultCallback(err);
        };
        return resultCallback(null, derivedKey.toString("hex"));
    });
}

function encryptString(str) {
    var iv, hash = generate64ByteToken(KEY_HASH + randomString(30)), passPhrase = CryptoJS.PBKDF2(KEY_JUNK, hash, {
        hasher: CryptoJS.algo.SHA256,
        keySize: 128,
        iterations: 32
    });
    iv = CryptoJS.PBKDF2(IV_HASH, hash, {
        hasher: CryptoJS.algo.SHA256,
        keySize: 128,
        iterations: 32
    });
    return CryptoJS.AES.encrypt(str, passPhrase, {
        mode: CryptoJS.mode.CFB,
        padding: CryptoJS.pad.Pkcs7,
        iv: iv
    }).toString() + ".-_" + hash;
}

function decryptString(str, resultCallback) {
    var decryptedStr, iv, key, arrHash;
    arrHash = str.split(".-_");
    try {
        key = CryptoJS.PBKDF2(KEY_JUNK, arrHash[1], {
            hasher: CryptoJS.algo.SHA256,
            keySize: 128,
            iterations: 32
        });
        iv = CryptoJS.PBKDF2(IV_HASH, arrHash[1], {
            hasher: CryptoJS.algo.SHA256,
            keySize: 128,
            iterations: 32
        });
        decryptedStr = CryptoJS.AES.decrypt(arrHash[0], key, {
            mode: CryptoJS.mode.CFB,
            padding: CryptoJS.pad.Pkcs7,
            iv: iv
        }).toString(CryptoJS.enc.Utf8);
        resultCallback(null, decryptedStr);
    } catch (e) {
        resultCallback(e);
    }
}

exports.encryptString = encryptString;
exports.decryptString = decryptString;
exports.encryptPassword = encryptPassword;
exports.generateUserTags = generateUserTags;
exports.generate64ByteToken = generate64ByteToken;