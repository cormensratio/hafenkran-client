<template>
  <base-page>
    <template slot="body">
      <div id="app" class="custom-form">
        <v-app>
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
                  <v-btn color="error" @click="resetForm">Clear</v-btn>
                  <v-btn color="success" @click="submit">Submit</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-app>
      </div>
    </template>
  </base-page>
</template>

<script>
import BasePage from '../baseComponents/BasePage';
import Header from '../baseComponents/Header';

export default {
  name: 'UserRegistrationPage',
  components: { BasePage, Header },
  el: '#app',
  data: () => ({
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
  }),

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
    resetForm() {
      this.errorMessages = [];
      this.formHasErrors = false;

      Object.keys(this.form).forEach((f) => {
        this.$refs[f].reset();
      });
    },
  },
};
</script>

<style>
  .headline {
    margin-right: auto;
  }
  .custom-form {
    justify-content: center;
    margin-left: 35%;
  }
</style>
