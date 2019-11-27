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

# run unit tests
npm run test

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


##Hafenkran client environment Settings

For the dev environment you can set following variables in /config/dev.env.js

- CLUSTER_SERVICE_URL: Url to Hafenkran Cluster Service
- USER_SERVICE_URL: Url to Hafenkran User Service
- AUTHENTICATION_REQUIRED: Toggle if authentication is required to access protected pages
- USE_TEST_TOKEN: Toggle if test token should be used
- TEST_TOKEN: Jwt token for test purposes


## IDE Improvements 

#### Warning: ``require() not resolved/found``

#### Enable code assistance in WebStorm:
- File => Settings => Languages & Frameworks => Node.js and NPM
- Tick checkbox 'Coding assistance for Node.js'

---

#### Warning:
Methods for testing (for example describe(), it(), ...) are marked as unknown. 
Also auto completion does not work for methods of jest.

#### Fix:
1. Go to: File => Settings => Languages & Frameworks => JavaScript => Libraries
2. Click on 'Add':
- Name: jest
- Visibility: Project
- Attach file: `` node_modules/@types/jest/index.d.ts``


