<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import { isNil } from 'lodash';
import store from './store/store';

Vue.use(Vuetify, {
  iconfont: 'md', // 'md' || 'mdi' || 'fa' || 'fa4'
});

export default {
  name: 'App',
  created() {
    console.log('Initiating Hafenkran client application...');
    const token = localStorage.getItem('user');
    if (!isNil(token)) {
      store.commit('updateToken', token);
      const success = store.dispatch('fetchUser');

      if (success) {
        store.dispatch('fetchExperiments');
      }
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
  margin-top: 60px;
}
</style>
