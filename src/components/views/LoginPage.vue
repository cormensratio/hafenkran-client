<template>
  <base-page>
    <template slot="body">
      <v-container fluid id="loginbox">
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md6>
            <v-card class="elevation-24 shaped">
              <v-spacer></v-spacer>
              <v-toolbar dark color="blue">
                <v-toolbar-title color="white" v-if="isAuthenticated" class="justify-center">
                  You are already logged in {{ user.name }}!
                </v-toolbar-title>
                <v-toolbar-title v-else color="white" class="justify-center">
                  Login to Hafenkran:
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
                         class="button">Cancel
                  </v-btn>
                </div>
              </v-card-actions>
              <v-sheet v-if="failedLogin"
                       elevation="5" dark class="bg-danger">Login failed
              </v-sheet>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </template>
  </base-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BasePage from '../baseComponents/BasePage';

export default {
  name: 'LoginPage',
  components: { BasePage },
  data() {
    return {
      userName: '',
      password: '',
      failedLogin: false,
    };
  },
  computed: {
    ...mapGetters(['user', 'isAuthenticated']),
  },
  methods: {
    ...mapActions(['login']),
    loginUser() {
      if (!this.isAuthenticated) {
        this.login({ name: this.userName, password: this.password })
          .then((response) => {
            if (response) {
              this.failedLogin = false;
              this.$router.push('/');
            } else {
              this.failedLogin = true;
            }
          });
      }
    },
  },
};
</script>
<style scoped>
  .button:hover {
    color: silver;
  }
</style>
