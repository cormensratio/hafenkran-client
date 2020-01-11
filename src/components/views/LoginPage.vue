<template>
  <base-page>
    <template slot="body">
      <v-container>
        <v-layout justify-center>
          <v-flex md4>
            <v-card>
              <v-toolbar dark style="background: var(--themeColor)">
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
                                @keyup.enter="loginUser"
                                label="Name" prepend-icon="person"/>
                  <v-text-field type="password" v-model="password" outline
                                @keyup.enter="loginUser"
                                label="Password" prepend-icon="lock"/>
                </v-form>
              </v-card-text>
              <v-card-actions class="justify-center">
                <div class="mb-3">
                  <v-btn large dark style="background: var(--themeColor)"
                         @click="loginUser()" class="button">Login
                  </v-btn>
                  <v-btn large to="/"
                         class="button">Cancel
                  </v-btn>
                </div>
              </v-card-actions>
              <v-progress-circular
                indeterminate
                color="#106ee0"
                v-if="loading"
              />
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </template>
  </base-page>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import BasePage from '../baseComponents/BasePage';

export default {
  name: 'LoginPage',
  components: { BasePage },
  data() {
    return {
      userName: '',
      password: '',
      loading: false,
    };
  },
  computed: {
    ...mapGetters(['user', 'isAuthenticated']),
  },
  methods: {
    ...mapActions(['login', 'triggerSnack']),
    ...mapMutations(['setSnack']),
    loginUser() {
      this.loading = true;
      if (!this.isAuthenticated) {
        this.login({ name: this.userName, password: this.password })
          .then((response) => {
            if (response) {
              this.setSnack('Login successful');
              this.$router.push('/experimentlist');
            } else {
              this.setSnack('Login failed');
              this.loading = false;
            }
            this.triggerSnack();
          });
      }
    },
  },
};
</script>
<style scoped>

</style>
