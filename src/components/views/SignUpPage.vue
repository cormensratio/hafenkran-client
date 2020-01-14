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
              <v-card-text>
                <v-form class="m-3">
                  <v-text-field
                    v-model="userName"
                    :rules="[rules.required]"
                    label="Username"
                    autofocus
                    outline
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="userEmail"
                    :rules="[rules.emailRules]"
                    label="Email"
                    outline
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    :rules="[rules.required, rules.min, rules.matchWithConfirm]"
                    :type="show ? 'text' : 'password'"
                    label="Password"
                    outline
                    hint="At least 8 characters"
                    counter
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="confirmPassword"
                    :rules="[rules.required, rules.min, rules.matchWithPassword]"
                    :type="show ? 'text' : 'password'"
                    label="Confirm Password"
                    outline
                    hint="At least 8 characters"
                    counter
                    required
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-divider class="mt-3 p-0 m-0"></v-divider>
              <v-card-actions>
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
import { isNil, isEqual } from 'lodash';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import BasePage from '../baseComponents/BasePage';
import Header from '../baseComponents/Header';
import UserService from '../../service/UserService';
import RulesMixin from '../../mixins/Rules';

export default {
  name: 'UserRegistrationPage',
  components: { BasePage, Header },
  mixins: [RulesMixin],
  data() {
    return {
      userName: null,
      userEmail: null,
      password: null,
      confirmPassword: null,
      show: false,
      loading: false,
    };
  },
  computed: {
    ...mapGetters(['userList', 'snack', 'snackShow']),
  },
  methods: {
    ...mapActions(['triggerSnack', 'registerUser']),
    ...mapMutations(['setSnack']),
    validateForm() {
      if (isNil(this.userName)) {
        this.userName = '';
      }
      if (isNil(this.userEmail)) {
        this.userEmail = '';
      }
      if (isNil(this.password)) {
        this.password = '';
      }
      if (isNil(this.confirmPassword)) {
        this.confirmPassword = '';
      }
    },
    arePasswordsEqual() {
      return isEqual(this.password, this.confirmPassword);
    },
    async register() {
      if (isNil(this.userName) && isNil(this.userEmail) && isNil(this.password)
        && isNil(this.confirmPassword)) {
        this.setSnack('Please fill out all text fields!');
        this.triggerSnack();
        return;
      }

      if (!this.arePasswordsEqual()) {
        this.setSnack('Passwords are not equal!');
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
        this.setSnack('Signup successful. Please wait until the admin accepts your request.');
        this.$router.push('/login');
      } else {
        this.setSnack('Signup failed');
      }
      this.triggerSnack();
    },
    async submitForm() {
      if (!isNil(this.userName) && !isNil(this.userEmail) && !isNil(this.password)
          && !isNil(this.confirmPassword)
          && this.password === this.confirmPassword) {
        const created = await UserService.postUserRegistrateFormInput(this.userName,
          this.userEmail,
          this.password);
        if (created) {
          this.$router.push('/'); // successfully added user
        } else {
          this.setSnack('Username already taken.');
        }
        this.loading = false;
        this.triggerSnack();
      } else {
        this.validateForm();
        this.setSnack('Form not valid.');
        this.triggerSnack();
      }
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
</style>
