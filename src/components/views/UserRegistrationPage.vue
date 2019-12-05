<template>
  <base-page>
    <template slot="body">
      <v-container>
        <v-layout>
          <v-flex>
            <v-card ref="form">
              <v-card-title>User Registration Form</v-card-title>
              <v-card-text>
                <v-text-field
                  v-model="userName"
                  :rules="[rules.required]"
                  :error-messages="errorMessages"
                  label="Username"
                  placeholder=""
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
                  :rules="[rules.required]"
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
                  :rules="[rules.required, passwordConfirmationRule]"
                  :type="show ? 'text' : 'password'"
                  label="Confirm Password"
                  outline
                  hint="At least 8 characters"
                  counter
                  required
                  placeholder=""
                ></v-text-field>
              </v-card-text>
              <v-divider class="mt-3"></v-divider>
              <v-card-actions>
                <v-btn>Submit</v-btn>
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
import Header from '../baseComponents/Header';

export default {
  name: 'UserRegistrationPage',
  components: { BasePage, Header },
  data() {
    return {
      errorMessages: '',
      userName: null,
      userEmail: null,
      password: null,
      confirmPassword: null,
      formHasErrors: false,
      show: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'At least 8 characters',
      },
      emailRules: {
        required: v => !!v || 'E-mail is required',
        regex: v => /.+@.+/.test(v) || 'E-mail must be valid',
      },
    };
  },
  computed: {
    form() {
      return {
        userName: this.userName,
        userEmail: this.userEmail,
        password: this.password,
        confirmPassword: this.confirmPassword,
      };
    },
    passwordConfirmationRule() {
      return () => (this.password === this.confirmPassword) || 'Password must match';
    },
  },

  watch: {
    name() {
      this.errorMessages = '';
    },
  },

  methods: {

  },
};
</script>

<style>

</style>
