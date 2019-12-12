'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  USER_SERVICE_URL: '"http://localhost:8081"',
  CLUSTER_SERVICE_URL: '"http://localhost:8082"',
  AUTHENTICATION_REQUIRED: true,
  USE_TEST_TOKEN: false,
  TEST_TOKEN: '"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDEiLCJleHAiOjE1NzQzNjgzMzYsInVzZXIiOnsiaWQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDEiLCJuYW1lIjoiTW9ydGltZXIiLCJlbWFpbCI6IiIsImlzQWRtaW4iOnRydWV9LCJpYXQiOjE1NzQzNTAzMzZ9.9Y8eq2ygcdZunZxDY__V-jT-v1wy1NG9oF-W5A-kP5jGa0p7AT8v_fPQO6srdS9zd4s3yNCkEDWV8Df52ieamg"'
});
