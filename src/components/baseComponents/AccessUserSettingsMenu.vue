<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <v-menu offset-y offset-x>
      <template v-slot:activator="{ on }">
        <v-btn @click="navigateToSettings()" v-on="on"
               fab small color="white">
          <span class="avatar-button">{{ user.name.charAt(0) }}</span>
        </v-btn>
      </template>
      <v-card>
        <v-container>
          <v-layout>
            <v-flex>
              <div class="font-weight-bold">{{user.name}}</div>
              <v-divider></v-divider>
              <div class="option">User settings</div>
              <v-divider></v-divider>
              <div class="option">Logout</div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { isEqual } from 'lodash';

export default {
  name: 'AccessUserSettingsMenu',
  computed: {
    ...mapGetters(['user', 'isAuthenticated']),
  },
  methods: {
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
  }
</style>
