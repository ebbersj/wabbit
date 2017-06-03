'use strict';

const Glue = require('glue');
const options = {
    relativeTo: __dirname
};

const manifest = {
    connections: [{
        host: 'localhost',
        labels: ['api'],
        port: 3000
    }],
    registrations: [{
        plugin: {
            register: './route'
        }
    }]
};

Glue.compose(manifest, options, (err, server) => {
    if (err) {
        throw err;
    }

    server.start(() => {
        console.log(`Server listning: ${server.info.uri}`);
    });
});
