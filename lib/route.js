'use strict';

const data = [{
        handler: './routes/test',
        method: 'POST',
        path: '/test',
        validation: {
            payload: {
                firstName: {
                    '@type': 'string',
                    min: 1,
                    max: 60,
                    required: true
                },
                lastName: {
                    '@type': 'string',
                    min: 1,
                    max: 60,
                    required: true
                }
            }
        }
    },
    {
        handler: './routes/test',
        method: 'GET',
        path: '/test2'
    }
];

const routeGenerator = require('./utils/routeGenerator');

module.exports = function(server, options, next) {
    for (let i = 0; i < data.length; i++) {
        server.route({
            method: data[i].method,
            path: data[i].path,
            handler: routeGenerator(data[i], __dirname)
        });
    }

    next();
};

module.exports.attributes = {
    name: 'routes'
};
