<template>
  <base-page>
    <template slot="body">
      <template>
        <v-form>
          <v-container>
            <v-layout column align-center>
              <v-flex class="mt-4">
                <span class="input-heading">Change your password</span>
                <v-divider/>
                <div class="input-size">
                  <v-text-field class="mt-4"
                                label="Current password"
                                single-line
                                outline
                  />
                  <v-text-field
                    v-model="newPassword"
                    label="New password"
                    single-line
                    outline
                  />
                  <v-text-field
                    label="Confirm new password"
                    single-line
                    outline
                  />
                </div>
                <v-btn class="save-button" ma-2 @click="updatePassword()">Save password</v-btn>
                <v-spacer class="mt-4"></v-spacer>
                <span class="input-heading">Change your e-mail address</span>
                <v-divider/>
                <div class="input-size">
                  <v-text-field class="mt-4"
                                label="Current email"
                                single-line
                                outline
                  />
                  <v-text-field
                    label="New email"
                    single-line
                    outline
                  />
                  </div>
                <v-btn class="save-button" @click="updateEmail()">Save email</v-btn>
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
  .input-heading{
    font-size: xx-large;
  }
  .input-size{
  }
  .save-button{
  }
</style>
