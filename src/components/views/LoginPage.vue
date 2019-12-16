<template>
  <base-page>
    <template slot="body">
      <v-container>
        <v-layout justify-center>
          <v-flex md4>
            <v-card>
              <v-toolbar dark color="blue">
                <v-toolbar-title color="white" v-if="isAuthenticated" class="justify-center">
                  You are already logged in {{ user.name }}!
                </v-toolbar-title>
                <v-toolbar-title v-else color="white" class="justify-center">
                  Login to Hafenkran:
                </v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form lazy-validation class="mt-3 mr-4">
                  <v-text-field v-model="userName" outline autofocus
                                v-on:keyup.enter="loginUser"
                                label="Name" prepend-icon="person"></v-text-field>
                  <v-text-field type="password" v-model="password" outline
                                v-on:keyup.enter="loginUser"
                                label="Password" prepend-icon="lock"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions class="justify-center">
                <div class="mb-3">
                  <v-btn large dark color="blue" to="/"
                         class="button">Cancel
                  </v-btn>
                  <v-btn large dark color="blue"
                         @click="loginUser()" class="button">Login
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

</style>
