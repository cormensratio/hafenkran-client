'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  USER_SERVICE_URL: '"http://localhost:8081"',
  CLUSTER_SERVICE_URL: '"http://localhost:8082"',
  AUTHENTICATION_REQUIRED: false
});
