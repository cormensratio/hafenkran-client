<template>
  <base-page>
    <template slot="body">
      <template>
        <v-form>
          <v-container>
            <v-layout column>
              <v-flex class="mt-4">
                <span class="description">Change password</span>
                <v-divider/>
                <div class="input-size">
                  <v-text-field class="mt-4"
                                   label="Current password"
                                   single-line
                                   outline
                ></v-text-field>
                  <v-text-field
                    v-model="newPassword"
                    label="New password"
                    single-line
                    outline
                  ></v-text-field>
                  <v-text-field
                    label="Confirm new password"
                    single-line
                    outline
                  ></v-text-field>
                </div>
                <v-btn @click="updatePassword()">Save password</v-btn>
              </v-flex>
              <v-flex class="mt-5">
                <span class="description">Change email address</span>
                <v-divider/>
                <div class="input-size">
                <v-text-field class="mt-4"
                  label="Current email"
                  single-line
                  outline
                ></v-text-field>
                <v-text-field
                  label="New email"
                  single-line
                  outline
                ></v-text-field>
                  </div>
                <v-btn @click="updateEmail()">Save email</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </template>
    </template>
  </base-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { isEqual, isNil } from 'lodash';
import BasePage from '../baseComponents/BasePage';

export default {
  name: 'UserSettingsPage',
  components: { BasePage },
  data() {
    return {
      newEmail: '',
      confirmNewEmail: '',
      newPassword: '',
      confirmNewPassword: '',
      password: '',
    };
  },
  computed: {
    ...mapGetters(['user', 'isAuthenticated']),
  },
  methods: {
    ...mapActions(['updateUser']),
    arePasswordsEqual() {
      return isEqual(this.newPassword, this.confirmNewPassword);
    },
    areEmailsEqual() {
      return isEqual(this.newEmail, this.confirmNewEmail);
    },
    async updatePassword() {
      if (this.arePasswordsEqual()) {
        const updatedUser = this.createUpdatedUser();
        if (!isNil(updatedUser)) {
          alert('Updated password.');
        }
      }
    },
    async updateEmail() {
      if (this.areEmailsEqual()) {
        const updatedUser = this.createUpdatedUser();
        if (!isNil(updatedUser)) {
          alert('Updated email address.');
        }
      }
    },
    createUpdatedUser() {
      return {
        email: this.user.email,
        password: this.newPassword,
        isAdmin: this.user.isAdmin,
      };
    },
  },
};
</script>

<style scoped>
  .description{
    font-size: xx-large;
  }
  .input-size{
    max-width: 500px;
  }
</style>
