<template>
  <base-page>
    <template slot="body">
      <div class="container">
        <h1 id="hello" v-if="isAuthenticated" class="m-2">Welcome {{ user.username }}</h1>
        <h1 v-else class="m-2">Welcome to Hafenkran</h1>
        <div class="card">
          <h3 class="card-title text-muted mt-2"> Please login </h3>
          <div class="m-auto">
            <v-btn class="m-3" :to="'/login'"> Login </v-btn>
            <v-btn class="m-3" :to="'/newexperiment'"> Test Upload
              <v-icon dark right>backup</v-icon></v-btn>
            <v-btn class="m-3" :to="'/experimentlist'"> Go To Experimentlist </v-btn>
          </div>
        </div>
      </div>
    </template>
  </base-page>
</template>

<script>

import { mapGetters } from 'vuex';
import BasePage from '../baseComponents/BasePage';
import Header from '../baseComponents/Header';

export default {
  name: 'StartPage',
  components: { BasePage, Header },

  computed: {
    ...mapGetters(['user', 'isAuthenticated']),
  },
};
</script>

<style scoped>
  #hello:not(hover) {
    animation-name: greet;
    animation-duration: 1s;
    animation-fill-mode: forwards;
    -webkit-animation-fill-mode: forwards;
  }
  @keyframes greet {
    0% {
      transform: scale(1.5, 1.5);
    }
    100% {
      transform: scale(1, 1);
    }
  }
</style>
