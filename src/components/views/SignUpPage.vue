<template>
  <base-page>
    <template slot="body">
      <v-container>
        <v-layout justify-center>
          <v-flex md4>
            <v-card ref="form">
              <v-toolbar dark class="toolbar">
                <v-toolbar-title>
                  Sign Up
                </v-toolbar-title>
              </v-toolbar>
              <v-card-text v-if="isAuthenticated">
                <div class="text-muted info-text">You are already logged in!</div>
              </v-card-text>
              <v-card-text v-else>
                <v-form class="m-3">
                  <v-text-field
                    v-model="userName"
                    :rules="[rules.required]"
                    @keyup.enter="register"
                    label="Username"
                    autofocus
                    outline
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="userEmail"
                    :rules="[rules.emailRules]"
                    @keyup.enter="register"
                    label="Email"
                    outline
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    :rules="[rules.required, rules.min]"
                    :type="show ? 'text' : 'password'"
                    @keyup.enter="register"
                    label="Password"
                    outline
                    hint="At least 8 characters"
                    counter
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="confirmPassword"
                    :rules="[rules.required, rules.min]"
                    :type="show ? 'text' : 'password'"
                    @keyup.enter="register()"
                    label="Confirm Password"
                    outline
                    hint="At least 8 characters"
                    counter
                    required
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions v-if="!isAuthenticated">
                <v-btn dark style="background-color: var(--themeColor);"
                       class="signup-button"
                       @click="register()">Sign Up</v-btn>
              </v-card-actions>
              <v-progress-circular
                size="50"
                indeterminate
                color="#106ee0"
                v-if="loading"
              />
              <v-snackbar v-model="snackShow" right>
                {{ snack }}
                <v-btn flat color="accent" @click.native="showSnackbar = false">Close</v-btn>
              </v-snackbar>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </template>
  </base-page>
</template>
<script>
import { isNil, isEmpty, isEqual } from 'lodash';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import BasePage from '../baseComponents/BasePage';
import Header from '../baseComponents/Header';
import RulesMixin from '../../mixins/Rules';

export default {
  name: 'UserRegistrationPage',
  components: { BasePage, Header },
  mixins: [RulesMixin],
  data() {
    return {
      userName: '',
      userEmail: '',
      password: '',
      confirmPassword: '',
      show: false,
      loading: false,
    };
  },
  computed: {
    ...mapGetters(['snack', 'snackShow', 'isAuthenticated']),
  },
  methods: {
    ...mapActions(['triggerSnack', 'registerUser']),
    ...mapMutations(['setSnack']),
    async register() {
      if (isEmpty(this.userName) || isEmpty(this.userEmail) || isEmpty(this.password)
        || isEmpty(this.confirmPassword)) {
        this.setSnack('Please fill in all fields!');
        this.triggerSnack();
        return;
      } else if (this.password.length < 8 && this.confirmPassword.length < 8) {
        this.setSnack('Passwords must contain at least 8 Characters');
        this.triggerSnack();
        return;
      } else if (!isEqual(this.password, this.confirmPassword)) {
        this.setSnack('Passwords do not match!');
        this.triggerSnack();
        return;
      }


      const response = await this.registerUser({
        username: this.userName,
        password: this.password,
        email: this.userEmail,
        isAdmin: false,
      });

      if (!isNil(response)) {
        this.setSnack('Signup successful. Please wait until an admin activates your account.');
        this.$router.push('/login');
      }
      this.triggerSnack();
    },
  },
};
</script>

<style scoped>
  .toolbar {
    background: var(--themeColor);
  }
  .signup-button {
    padding: 0;
    margin: auto;
  }
  .info-text {
    font-size: 14pt;
  }
</style>
