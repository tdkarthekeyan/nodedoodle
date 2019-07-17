"use strict";

var Ajv = require("ajv"),
    _ = require("lodash"),
    ajvErrors = require("ajv-errors");

var ajv = new Ajv({
    allErrors: true,
    jsonPointers: true
}),
    defaultSchema = {
        "type": "object",
        "additionalProperties": false
    };

ajvErrors(ajv);


function validate(path, jsonSchema) {
    return function (req, res, next) {
        var v = {},
            errors = [];

        if (jsonSchema[path] && jsonSchema[path][req.method.toUpperCase()]) {

            v.body = ajv.compile(jsonSchema[path][req.method.toUpperCase()].body || defaultSchema);
            v.query = ajv.compile(jsonSchema[path][req.method.toUpperCase()].query || defaultSchema);
            v.params = ajv.compile(jsonSchema[path][req.method.toUpperCase()].params || defaultSchema);

            v.body(req.body);
            v.query(req.query);
            v.params(req.params);

            errors = errors.concat(v.body.errors || []);
            errors = errors.concat(v.query.errors || []);
            errors = errors.concat(v.params.errors || []);

            if (errors.length > 0) {
                errors = _.map(errors, "message");
                /*req.log.error({
                    errors: errors
                }, "API input validation failed");*/
                res.status(400).json({
                    status: "Failure",
                    message: errors,
                    code: 400
                });
            } else {
                next();
            }
        } else {
            req.log.error("JSON Schema not yet defined");
            res.status(404).json({
                status: "Failure",
                code: 404
            });
        }
    };
}

exports.validate = validate;