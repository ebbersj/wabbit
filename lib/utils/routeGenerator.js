'use strict';

const _ = require('lodash');
const Boom = require('boom');
const BPromise = require('bluebird');
const builder = require('joi-json').builder();
const Joi = require('joi');
const Path = require('path');

BPromise.promisifyAll(Joi);

module.exports = function(record, relPath) {
    let handler = Path.join(relPath, record.handler);
    return _.partialRight(module.exports.createHandler, record.validation, handler);
};

module.exports.createHandler = function(request, reply, validation, handler) {
    let validationSchema;

    return BPromise.try(() => {
            validationSchema = builder.build(validation || {});
            return Joi.validateAsync(request, validationSchema, {
                allowUnknown: true
            });
        })
        .catch((e) => {
            throw Boom.wrap(e, 400);
        })
        .then((values) => {
            _.merge(request, values);
            return require(handler)(request);
        })
        .done(reply, reply);
};
