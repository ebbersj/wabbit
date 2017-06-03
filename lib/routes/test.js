'use strict';

const BPromise = require('bluebird');

module.exports = function(request) {
    return BPromise.try(() => {
        return {
            test: true,
            success: true
        };
    });
};
