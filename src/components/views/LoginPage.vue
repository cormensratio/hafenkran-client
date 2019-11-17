<template>
  <base-page>
    <template slot="body">
      <v-container fluid id="loginbox">
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md6>
            <div class="bg-success" v-if="isAuthenticated">
              <h2 class="white--text">You are logged in!</h2>
              <v-btn to="/">Go to Main Menu</v-btn>
            </div>
            <v-card class="elevation-24 shaped">
              <v-spacer></v-spacer>
              <v-toolbar dark color="blue">
                <v-toolbar-title color="white"
                                 class="justify-center">Login to Hafenkran
                </v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" lazy-validation>
                  <v-text-field v-model="userName"
                                label="Name" prepend-icon="person"></v-text-field>
                  <v-text-field type="password" v-model="password"
                                label="Password" prepend-icon="lock"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions class="justify-center">
                <div>
                  <v-btn large dark color="blue"
                         @click="loginUser()" class="button">Login
                  </v-btn>
                  <v-btn large dark color="blue" to="/"
                         @click="testing()" class="button">Cancel
                  </v-btn>
                </div>
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
import UserStore from '../../store/UserStore';

export default {
  name: 'LoginPage',
  components: { BasePage },
  data() {
    return {
      userName: '',
      password: '',
      isAuthenticated: UserStore.getters.isAuthenticated(),
    };
  },
  methods: {
    loginUser() {
      UserStore.login(this.userName, this.password);
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
