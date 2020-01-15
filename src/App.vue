<template>
  <div id="app">
    <v-app>
      <router-view/>
    </v-app>
  </div>
</template>

<script>
import Vue from 'vue';
import Vuetify from 'vuetify';
import store from './store/store';
import AuthService from './service/AuthService';

Vue.use(Vuetify, {
  iconfont: 'md', // 'md' || 'mdi' || 'fa' || 'fa4'
});

export default {
  name: 'App',
  async created() {
    console.log('Initiating Hafenkran client application...');

    if (process.env.USE_TEST_TOKEN) {
      localStorage.removeItem('user');
      localStorage.setItem('user', process.env.TEST_TOKEN);
      store.commit('updateUser', {
        id: '1',
        name: 'Test-Mortimer',
        isAdmin: true,
        email: 'test.rick@pickle.com',
      });
    } else if (await AuthService.initAuthentication()) {
      store.dispatch('fetchUser');
      store.dispatch('fetchUserList');
    }
  },
};
</script>

<style>
  html, body {
    width: 100%;
    height: 100%;
  }

  #app {
    font-family: Camphor,Open Sans,Segoe UI,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    overflow: hidden;
    background-color: #e8ebed;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
  }
  :root {
    --themeColor: #106ee0;
  }
</style>
