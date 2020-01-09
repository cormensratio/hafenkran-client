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
                  <v-text-field
                    v-model="newPassword"
                    label="New password"
                    :type="show_password ? 'text' : 'password'"
                    single-line
                    outline
                    :rules="[rules.min]"
                  />
                  <v-text-field
                    v-model="confirmNewPassword"
                    label="Confirm new password"
                    :type="show_password ? 'text' : 'password'"
                    single-line
                    outline
                    :rules="[rules.min]"
                  />
                </div>
                <v-btn class="save-button" ma-2 @click="updatePassword()">Save password</v-btn>
                <v-spacer class="mt-4"></v-spacer>
                <span class="input-heading">Change your e-mail address</span>
                <v-divider/>
                <div class="input-size">
                  <v-text-field
                    v-model="email"
                    label="Current email"
                    single-line
                    outline
                    :rules="[rules.emailRules]"
                  />
                  <v-text-field
                    v-model="newEmail"
                    label="New email"
                    single-line
                    outline
                    :rules="[rules.emailRules]"
                  />
                  </div>
                <v-btn class="save-button" @click="updateEmail()">Save email</v-btn>
              </v-flex>
            </v-layout>
            <v-snackbar v-model="snackShow" right>
              {{ snack }}
              <v-btn flat color="accent" @click.native="showSnackbar = false">Close</v-btn>
            </v-snackbar>
            <v-dialog v-model="showConfirmDialog" width="300">
              <v-card>
                <v-card-title>Type in your password to confirm update</v-card-title>
                <v-card-text>
                  <v-text-field
                    v-model="password"
                    label="Current password"
                    :type="show_password ? 'text' : 'password'"
                    single-line
                    outline
                  />
                </v-card-text>
                <v-card-actions class="justify-center">
                  <v-btn style="background: var(--themeColor)"
                         @click="updateUserInfo">
                    Confirm
                  </v-btn>
                  <v-btn @click="showConfirmDialog = false">Cancel</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-container>
        </v-form>
      </template>
    </template>
  </base-page>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { isEqual, isNil } from 'lodash';
import BasePage from '../baseComponents/BasePage';
import RulesMixin from '../../mixins/Rules';

export default {
  name: 'UserSettingsPage',
  components: { BasePage },
  mixins: [RulesMixin],
  data() {
    return {
      email: '',
      newEmail: '',
      newPassword: '',
      confirmNewPassword: '',
      password: '',
      username: '',
      show_password: false,
      showConfirmDialog: false,
      newUserInformation: {
        newPassword: '',
        email: '',
        isAdmin: false,
        password: '',
      },
    };
  },
  computed: {
    ...mapGetters(['user', 'isAuthenticated', 'snackShow', 'snack']),
  },
  methods: {
    ...mapMutations(['setSnack']),
    ...mapActions(['updateUser', 'triggerSnack']),
    arePasswordsEqual() {
      return isEqual(this.newPassword, this.confirmNewPassword);
    },
    areEmailsEqual() {
      return isEqual(this.email, this.newEmail);
    },
    async updateUserInfo() {
      this.showConfirmDialog = true;
      this.newUserInformation.password = this.password;

      if (!isNil(this.newUserInformation)) {
        const updatedUser = await this.updateUser(this.newUserInformation);

        if (!isNil(updatedUser)) {
          this.clearFields();
          this.setSnack('Successfully updated user information');
        } else {
          this.password = '';
          this.setSnack('Failed to update user information!');
        }

        this.triggerSnack();
      }
      this.showConfirmDialog = false;
    },
    async updatePassword() {
      if (this.arePasswordsEqual()) {
        this.updateNewUserInfo(undefined, this.newPassword);
        this.showConfirmDialog = true;
      } else {
        this.setSnack('Passwords are not equal!');
        this.triggerSnack();
      }
    },
    async updateEmail() {
      if (!this.areEmailsEqual()) {
        this.updateNewUserInfo(this.newEmail, undefined);
        this.showConfirmDialog = true;
      } else {
        this.setSnack('Same e-mail address not allowed.');
        this.triggerSnack();
      }
    },
    updateNewUserInfo(email, newPassword) {
      this.newUserInformation.email = email || this.user.email;
      this.newUserInformation.isAdmin = this.user.isAdmin;
      this.newUserInformation.newPassword = newPassword || '';
    },
    clearFields() {
      this.newPassword = '';
      this.password = '';
      this.newEmail = '';
      this.confirmNewPassword = '';
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
