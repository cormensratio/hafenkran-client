'use strict';
const merge = require('webpack-merge');
const devEnv = require('./dev.env');

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  USER_SERVICE_URL: '"USER_SERVICE_URL"',
  CLUSTER_SERVICE_URL: '"CLUSTER_SERVICE_URL"',
});
