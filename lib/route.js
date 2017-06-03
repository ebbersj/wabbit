'use strict';

const routeGenerator = require('./utils/routeGenerator');

module.exports = function(server, options, next) {
  for (let i = 0; i < options.routes.length; i++) {
    server.route({
      method: options.routes[i].method,
      path: options.routes[i].path,
      handler: routeGenerator(options.routes[i], __dirname)
    });
  }

  next();
};

module.exports.attributes = {
  name: 'routes'
};
