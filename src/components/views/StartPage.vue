<template>
  <base-page>
    <template slot="body">
        <v-card flat class="welcome-card" v-if="!isAuthenticated">
          <v-card-title class="justify-content-center">
            <h1 v-if="isAuthenticated">Welcome {{ user.name }}</h1>
            <h1 v-else>Welcome to Hafenkran</h1>
          </v-card-title>
          <div class="content">
            <h1 class="card-title mt-2"> Please login </h1>
          </div>
        </v-card>
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
.welcome-card {
  width: 100%;
  height: 60vh;
  margin-top: 5%;
}
.content {
  background-color: white;
  height: 100%;
}
</style>
