<template>
  <base-page>
    <template slot="body">
      <div class="container">
        <div class="card">
          <div class="card-title">Login to Hafenkran</div>
          <div class="m-5">
            <v-text-field label="Username" v-model="userName"></v-text-field>
            <v-text-field label="Password" v-model="password" :type="'password'"></v-text-field>
          </div>
          <v-btn @click="login">Login</v-btn>
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

</style>
