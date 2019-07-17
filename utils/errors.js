"use strict";

module.exports = {
    "200": {
        status: "Success",
        code: 200
    },
    "401": {
        message: "Authentication failed",
        status: "Failure",
        code: 401
    },
    "401": {
        message: "Invalid Password",
        status: "Failure",
        code: 401
    },
    "404": {
        message: "Customer Account Not Found",
        status: "Failure",
        code: 404
    },
    "409": {
        message: "Conflict",
        status: "Failure",
        code: 409
    },
    "412": {
        message: "Pre Condition Failed",
        status: "Failure",
        code: 412
    },
    "422": {
        message: "Duplicate entry",
        status: "Failure",
        code: 422
    },
    "500": {
        message: "Internal server error",
        status: "Failure",
        code: 500
    }
};