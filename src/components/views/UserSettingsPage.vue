<template>
  <base-page>
    <template slot="body">
      <div class="container">
        <v-card class="shaped">
          <v-toolbar dark color="blue">
            <v-toolbar-title color="white">
              Change your credentials:
            </v-toolbar-title>
          </v-toolbar>
            <v-container class="edit-info-box">
              <v-layout column>
                <v-flex>
                  <span>Email: {{user.email}}</span>
                  <v-icon @click="editMail = !editMail">edit</v-icon>
                </v-flex>
                <v-flex v-show="editMail">
                  <v-text-field type="email"
                                v-model="user.email"
                                label="Current email address"
                                prepend-icon="email"/>
                </v-flex>
              </v-layout>
            </v-container>
            <!--<v-text-field type="email" v-model="email"
                          label="Current email address" prepend-icon="email"/>
            <v-text-field type="email" v-model="email"
                          label="New email address" prepend-icon="email"/>
            <v-text-field type="password" v-model="password"
                          label="Current password" prepend-icon="lock">

            </v-text-field>
            <v-text-field type="password" v-model="password"
                          label="New password" prepend-icon="lock"/>-->
          <v-card-actions class="justify-center">
            <div>
              <v-btn large dark color="blue"
                     @click="changePassword()" class="button">Save
              </v-btn>
              <v-btn large dark color="blue" to="/"
                     class="button">Cancel
              </v-btn>
            </div>
          </v-card-actions>
          <v-sheet v-if="failedLogin"
                   elevation="5" dark class="bg-danger">Login failed
          </v-sheet>
        </v-card>
      </div>
    </template>
  </base-page>
</template>

<script>
import { mapGetters } from 'vuex';
import BasePage from '../baseComponents/BasePage';

export default {
  name: 'LoginPage',
  components: { BasePage },
  data() {
    return {
      editMail: false,
      editPassword: false,
      userName: '',
      password: '',
      failedLogin: false,
    };
  },
  computed: {
    ...mapGetters(['user', 'isAuthenticated']),
  },
  methods: {

  },
};
</script>
<style scoped>
  .button:hover {
    color: silver;
  }

  .edit-info-box {
    text-align: justify;
  }
</style>
