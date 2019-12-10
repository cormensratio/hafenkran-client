<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue';
import Vuetify from 'vuetify';
import { isNil } from 'lodash';
import store from './store/store';
import AuthService from './service/AuthService';

Vue.use(Vuetify, {
  iconfont: 'md', // 'md' || 'mdi' || 'fa' || 'fa4'
});

export default {
  name: 'App',
  created() {
    console.log('Initiating Hafenkran client application...');

    if (process.env.USE_TEST_TOKEN) {
      localStorage.removeItem('user');
      localStorage.setItem('user', process.env.TEST_TOKEN);
      store.commit('updateUser', {
        id: '1',
        name: 'Test-Rick',
        isAdmin: true,
        email: 'test.rick@pickle.com',
      });
    } else {
      const token = localStorage.getItem('user');
      if (!isNil(token)) {
        AuthService.extractTokenInfo(token);
        store.dispatch('fetchUser');
      }
    }
  },
};
</script>

<style>
#app, body, html {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #e8ebed;
  overflow: hidden;
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100%;
}
body {

}
</style>
