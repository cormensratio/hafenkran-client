<template>
  <base-page>
    <template slot="body">
      <template>
        <v-container>
          <v-card class="mx-auto white" width="750">
            <v-toolbar dark class="toolbar">
              <v-toolbar-title color="white" class="justify-center">
                User Settings of {{ currentUser.name }}
              </v-toolbar-title>
            </v-toolbar>
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
                        :type="showPassword ? 'text' : 'password'"
                        single-line
                        outline
                        counter
                        :rules="[rules.min]"
                      />
                      <v-text-field
                        v-model="confirmNewPassword"
                        label="Confirm new password"
                        :type="showPassword ? 'text' : 'password'"
                        single-line
                        outline
                        counter
                        :rules="[rules.min]"
                      />
                    </div>
                    <v-btn class="save-button" ma-2 @click="updatePassword()">Save password</v-btn>
                    <v-spacer class="mt-4"></v-spacer>
                    <span class="input-heading">Change your e-mail address</span>
                    <v-divider/>
                    <div class="input-size">
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
                        ref="enterPassword"
                        v-model="password"
                        label="Current password"
                        :type="showPassword ? 'text' : 'password'"
                        @keyup.enter="updateUserInfo"
                        single-line
                        outline
                      />
                    </v-card-text>
                    <v-card-actions class="justify-center">
                      <v-btn style="background: var(--themeColor)"
                             dark
                             @click="updateUserInfo">
                        Confirm
                      </v-btn>
                      <v-btn @click="showConfirmDialog = false">Cancel</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-container>
            </v-form>
          </v-card>
        </v-container>
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
      currentUser: '',
      newEmail: '',
      newPassword: '',
      confirmNewPassword: '',
      password: '',
      username: '',
      showPassword: false,
      showConfirmDialog: false,
      newUserInformation: {
        id: this.userid,
        newPassword: '',
        email: '',
        isAdmin: false,
        password: '',
      },
    };
  },
  props: {
    userid: String,
  },
  computed: {
    ...mapGetters(['user', 'isAuthenticated', 'snackShow', 'snack']),
  },
  watch: {
    async userid() {
      this.currentUser = await this.getUserById(this.userid);
    },
  },
  methods: {
    ...mapMutations(['setSnack', 'setColor']),
    ...mapActions(['updateUser', 'triggerSnack', 'getUserById', 'fetchUserList']),
    arePasswordsEqual() {
      return isEqual(this.newPassword, this.confirmNewPassword);
    },
    async updateUserInfo() {
      this.newUserInformation.password = this.password;

      if (!isNil(this.newUserInformation)) {
        const updatedUser = await this.updateUser(this.newUserInformation);

        if (!isNil(updatedUser)) {
          this.clearFields();
          this.setColor('green');
          this.setSnack('Successfully updated user information');
        } else {
          this.password = '';
          this.setSnack('Incorrect password!!');
          this.setColor('error');
        }
        this.triggerSnack();
      }
      this.fetchUserList();
      this.showConfirmDialog = false;
    },
    async updatePassword() {
      if (this.newPassword.length > 7 && this.confirmNewPassword.length > 7) {
        if (this.arePasswordsEqual()) {
          this.updateNewUserInfo(undefined, this.newPassword);
          if (this.userid === this.user.id || this.currentUser.isAdmin) {
            this.showConfirmDialog = true;
          } else {
            this.updateUserInfo();
          }
        } else {
          this.setSnack('Passwords do not match!');
          this.triggerSnack();
        }
      } else {
        this.setSnack('Passwords need to contain at least 8 characters!');
        this.triggerSnack();
      }
    },
    async updateEmail() {
      if ((this.rules.emailRegex.test(this.newEmail))) {
        this.updateNewUserInfo(this.newEmail, undefined);
        if (this.userid === this.user.id || this.currentUser.isAdmin) {
          this.showConfirmDialog = true;
        } else {
          this.updateUserInfo();
        }
      } else {
        this.setSnack('Please enter a valid email! E.g. email@example.com');
        this.triggerSnack();
        this.newEmail = '';
      }
    },
    updateNewUserInfo(email, newPassword) {
      this.newUserInformation.email = email || this.currentUser.email;
      this.newUserInformation.isAdmin = this.currentUser.isAdmin;
      this.newUserInformation.newPassword = newPassword || '';
    },
    clearFields() {
      this.newPassword = '';
      this.password = '';
      this.confirmNewPassword = '';
      this.newEmail = '';
    },
  },
  async created() {
    await this.fetchUserList();
    this.currentUser = await this.getUserById(this.userid);
  },
};
</script>

<style scoped>
  .input-heading {
    font-size: xx-large;
  }
  .toolbar {
    background: var(--themeColor);
  }
</style>
