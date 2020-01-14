<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" fab small color="white">
          <span class="avatar-button">{{ user.name.charAt(0) }}</span>
        </v-btn>
      </template>
      <v-card>
        <v-list>
          <v-list-tile>
            <div class="list-title">{{user.name}}</div>
          </v-list-tile>
          <v-list-tile @click="navigateToSettings" class="option">
            <v-icon class="mr-1">account_circle</v-icon>
            User settings
          </v-list-tile>
          <v-list-tile @click="logoutUser" class="option">
            <v-icon class="mr-1">logout</v-icon>
            Logout
          </v-list-tile>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { isEqual } from 'lodash';

export default {
  name: 'AccessUserSettingsMenu',
  computed: {
    ...mapGetters(['user', 'isAuthenticated']),
  },
  methods: {
    ...mapActions(['logout']),
    logoutUser() {
      this.logout().then(() => {
        this.$router.push('/');
      });
    },
    navigateToSettings() {
      if (this.isAuthenticated) {
        if (!isEqual(this.$route.fullPath, '/settings')) {
          this.$router.push('/settings');
        }
      } else {
        this.$router.push('/login');
      }
    },
  },
};
</script>

<style scoped>
  .avatar-button {
    font-size: 18pt;
  }
  .option {
    text-align: start;
    font-size: 10pt;
  }

  .option:hover {
    background-color: lightgray;
  }
  .list-title {
    font-weight: bold;
    font-size: 12pt;
  }
</style>
