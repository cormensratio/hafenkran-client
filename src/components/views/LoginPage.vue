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
        <v-btn @click="test">test me</v-btn>
      </div>
    </template>
  </base-page>
</template>

<script>
import BasePage from '../baseComponents/BasePage';
import AuthenticationService from '../../service/AuthenticationService';
import ApiService from '../../service/ApiService';

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
    test() {
      const test = ApiService.doGet("http://localhost:8081/users/me");
      console.log("ME: ", test);
    },
  },
};
</script>

<style scoped>

</style>
