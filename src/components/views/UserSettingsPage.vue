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
                    class="mt-4"
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
            <v-dialog v-model="showConfirmDialog">
              <div>Confirm changes with your password</div>
              <v-text-field class="mt-4"
                            v-model="password"
                            label="Current password"
                            :type="show_password ? 'text' : 'password'"
                            single-line
                            outline
              />
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
    async updatePassword() {
      this.showConfirmDialog = true;
      if (this.arePasswordsEqual()) {
        const updatedUser = this.createUpdatedUser(undefined, this.newPassword);
        if (!isNil(updatedUser)) {
          this.setSnack('Updated password.');
          this.triggerSnack();
        }
      }
    },
    async updateEmail() {
      this.showConfirmDialog = true;
      if (!this.areEmailsEqual()) {
        const newUserInformation = this.createUpdatedUser(this.newEmail, this.password, undefined);
        if (!isNil(newUserInformation)) {
          const updatedUser = this.updateUser(newUserInformation);
          if (isNil(updatedUser)) {
            this.setSnack();
          }
          this.setSnack('Updated e-mail address.');
        }
      } else {
        this.setSnack('Same e-mail address not allowed.');
      }
      this.triggerSnack();
    },
    createUpdatedUser(email, password, newPassword) {
      return {
        email: email || this.user.email,
        password: password || '',
        isAdmin: this.user.isAdmin,
        newPassword: newPassword || '',
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
