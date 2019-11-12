<template>
  <base-page>
    <template slot="body">
      <v-container fluid id="loginbox">
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md6>
            <v-card class="elevation-24 shaped">
              <v-spacer></v-spacer>
              <v-toolbar dark color="blue">
                <v-toolbar-title color="white"
                                 class="justify-center">Login to Hafenkran
                </v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field v-model="userName"
                                label="Name" prepend-icon="person"></v-text-field>
                  <v-text-field type="password" v-model="password"
                                label="Password" prepend-icon="lock"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions class="justify-center">
                <v-btn large dark color="blue"
                       @click="login()" class="button">Login
                </v-btn>
                <v-btn large dark color="blue" to="/"
                       @click="testing()" class="button">Cancel
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
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
    testing() {
      console.log(this.userName);
      console.log(this.password);
    },
    login() {
      AuthenticationService.login(this.userName, this.password);
    },
  },
};
</script>
<style scoped>
  .button:hover {
    color: silver;
  }

  #loginbox {
    margin-top: 5%;
  }
</style>
