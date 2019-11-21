'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  USER_SERVICE_URL: '"http://localhost:8081"',
  CLUSTER_SERVICE_URL: '"http://localhost:8082"',
  AUTHENTICATION_REQUIRED: false,
  USE_TEST_TOKEN: true,
  TEST_TOKEN: '"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhNDYwNDVkZS1iOGZmLTQwNDQtYjI4Yi1iYmExMGI5MDg2YWIiLCJleHAiOjE1Nzg4NTkwMjEsInVzZXIiOnsiaWQiOiJhNDYwNDVkZS1iOGZmLTQwNDQtYjI4Yi1iYmExMGI5MDg2YWIiLCJ1c2VybmFtZSI6IlJpY2siLCJlbWFpbCI6IiIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTczNjc1MDIxfQ.feFhLvP7xsHgM76s1KmsUQ_1mU1JDRq6MY58L5e_iiDIr2UlAD2pt5HtuYecRj_xbF84s7o-IT24e_nW3M8hSg"'
});
