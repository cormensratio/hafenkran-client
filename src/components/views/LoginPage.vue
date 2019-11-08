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
          <v-btn class="login-button" @click="login">Login</v-btn>
        </div>
        <div>
          <v-btn :href="'/protected'"> Go to protected resource </v-btn>
        </div>
      </div>
    </template>
  </base-page>
</template>

<script>
import BasePage from '../baseComponents/BasePage';
import AuthenticationService from '../../service/AuthenticationService';

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
    login() {
      AuthenticationService.login(this.userName, this.password);
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
