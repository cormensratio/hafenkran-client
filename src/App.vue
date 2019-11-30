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
    }

    const token = localStorage.getItem('user');
    if (!isNil(token)) {
      AuthService.extractTokenInfo(token);
      store.dispatch('fetchUser');
    }
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
