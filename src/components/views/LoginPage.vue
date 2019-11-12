<template>
  <base-page>
    <template slot="body">
      <div class="container">
        <div class="card">
          <h1 class="card-title text-muted mt-1">Login to Hafenkran</h1>
          <div class="m-5">
            <v-text-field label="Username" v-model="userName"></v-text-field>
            <v-text-field label="Password" v-model="password" :type="'password'"></v-text-field>
          </div>
          <v-btn class="login-button" @click="loginUser()">Login</v-btn>
        </div>
        <div>
          <v-btn :href="'/protected'"> Go to protected resource </v-btn>
        </div>
      </div>
    </template>
  </base-page>
</template>

<script>
import { mapActions } from 'vuex';
import BasePage from '../baseComponents/BasePage';

export default {
  name: 'LoginPage',
  components: { BasePage },
  data() {
    return {
      userName: '',
      password: '',
    };
  },
  methods: {
    ...mapActions(['login']),
    loginUser() {
      this.login({ username: this.userName, password: this.password });
    },
  },
};
</script>

<style scoped>
.login-button {
  width: 4%;
  margin-bottom: 1%;
  margin-left: auto;
  margin-right: auto;
}
</style>
