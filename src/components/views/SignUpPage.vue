<template>
  <base-page>
    <template slot="body">
      <v-container>
        <v-layout class="justify-center">
          <v-card class="col p-0" max-width="650px" ref="form">
            <v-toolbar dark class="toolbar">
              <v-toolbar-title>
                Sign Up
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-text-field
                v-model="userName"
                :rules="[rules.required]"
                label="Username"
                placeholder=""
                autofocus
                outline
                required
              ></v-text-field>
              <v-text-field
                v-model="userEmail"
                :rules="[emailRules.required, emailRules.regex]"
                label="Email"
                placeholder=""
                outline
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                :rules="[rules.required, rules.min, rules.matchWithConfirm]"
                :type="show ? 'text' : 'password'"
                label="Password"
                placeholder=""
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
                placeholder=""
              ></v-text-field>
            </v-card-text>
            <v-divider class="mt-3 p-0 m-0"></v-divider>
            <v-card-actions>
              <v-btn dark style="background-color: var(--themeColor);
              padding: 0; margin: auto;"
                     @click="submitForm()">Sign Up</v-btn>
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
        </v-layout>
      </v-container>
    </template>
  </base-page>
</template>
<script>
import { isNil } from 'lodash';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import BasePage from '../baseComponents/BasePage';
import Header from '../baseComponents/Header';
import UserService from '../../service/UserService';

export default {
  name: 'UserRegistrationPage',
  components: { BasePage, Header },
  data() {
    return {
      userName: null,
      userEmail: null,
      password: null,
      confirmPassword: null,
      show: false,
      loading: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'At least 8 characters',
        matchWithConfirm: v => v === this.confirmPassword || 'Passwords must match',
        matchWithPassword: v => v === this.password || 'Passwords must match',
      },
      emailRules: {
        required: v => !!v || 'E-mail is required',
        regex: v => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid',
      },
    };
  },
  computed: {
    ...mapGetters(['userList', 'snack', 'snackShow']),
  },
  methods: {
    ...mapActions(['triggerSnack']),
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
</style>
