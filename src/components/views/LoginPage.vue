<template>
  <base-page>
    <template slot="body">
      <v-container>
        <v-layout justify-center>
          <v-flex md4>
            <v-card>
              <v-toolbar dark style="background: var(--themeColor)">
                <v-toolbar-title color="white" class="justify-center">
                  Login to Hafenkran:
                </v-toolbar-title>
              </v-toolbar>
              <v-card-text v-if="!isAuthenticated">
                <v-form lazy-validation class="mt-3 mr-4">
                  <v-text-field v-model="userName" outline autofocus
                                @keyup.enter="loginUser"
                                label="Name" prepend-icon="person"/>
                  <v-text-field type="password" v-model="password" outline
                                @keyup.enter="loginUser"
                                label="Password" prepend-icon="lock"/>
                </v-form>
              </v-card-text>
              <v-card-text v-else>
                <div class="text-muted info-text">You are already logged in {{ user.name }}!</div>
              </v-card-text>
              <v-card-actions class="justify-center" v-if="!isAuthenticated">
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
import { isEmpty } from 'lodash';
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
    ...mapGetters(['user', 'isAuthenticated', 'snack']),
  },
  methods: {
    ...mapActions(['login', 'triggerSnack']),
    ...mapMutations(['setSnack', 'showSnack', 'setColor']),
    loginUser() {
      this.loading = true;
      if (!isEmpty(this.userName) && !isEmpty(this.password)) {
        if (!this.isAuthenticated) {
          this.login({ name: this.userName, password: this.password })
            .then((response) => {
              if (response) {
                this.setSnack('Login successful');
                this.setColor('green');
                this.$router.push('/experimentlist');
              } else if (this.snack.includes('Error')) {
                this.setSnack('This user does not exist!');
                this.setColor('error');
              } else if (this.snack.includes('Unauthorized')) {
                this.setSnack('Wrong username or password!');
                this.setColor('error');
              }
            });
        }
      } else {
        this.setSnack('Please enter a username and password!');
        this.setColor('error');
      }
      this.triggerSnack();
      this.loading = false;
    },
  },
};
</script>
<style scoped>
  .info-text {
    font-size: 14pt;
  }
</style>
