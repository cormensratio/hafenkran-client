# HafenkranClient

> Vue client for the cluster based computing software Hafenkran

## Build Setup

To perform these actions, NodeJs needs to be installed on your machine:
https://nodejs.org/en/

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


##Environment Settings

For the dev environment you can set following variables in /config/dev.env.js

- CLUSTER_SERVICE_URL: Url to Hafenkran Cluster Service
- USER_SERVICE_URL: Url to Hafenkran User Service
- AUTHENTICATION_REQUIRED: Toggle if authentication is required to access protected pages
- USE_TEST_TOKEN: Toggle if test token should be used
- TEST_TOKEN: Jwt token for test purposes

