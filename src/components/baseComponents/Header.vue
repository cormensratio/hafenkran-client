<template>
  <div class="hafen-header pb-1">
    <v-toolbar height="75vh" class="hafen-toolbar">
      <v-toolbar-title class="mr-5 pt-2" @click="navigateToStartPage()">
        <img alt="header" class="hafen-logo" src="../../assets/hafenkran.png">
        <span class="logo-title">HAFENKRAN</span>
      </v-toolbar-title>
      <v-toolbar-items v-if="isAuthenticated">
        <v-btn flat dark to="/experimentlist">Experiments</v-btn>
        <v-btn flat dark to="/executionlist">Executions</v-btn>
        <v-btn flat dark to="/newexperiment">Upload</v-btn>
        <v-btn v-if="user.isAdmin" flat dark to="/users">Users</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <access-user-settings-menu v-if="isAuthenticated"></access-user-settings-menu>
      <div v-else>
        <v-btn flat dark class="m-3" to="/login"> Login </v-btn>
      </div>
    </v-toolbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AccessUserSettingsMenu from './AccessUserSettingsMenu';

export default {
  name: 'Header',
  components: { AccessUserSettingsMenu },
  computed: {
    ...mapGetters(['isAuthenticated', 'user']),
  },
  methods: {
    navigateToStartPage() {
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
  .hafen-logo {
    margin-left: 30px;
    width: 55px;
    height: 55px;
    filter: invert(1);
  }
  .logo-title {
    padding-left: 10px;
    color: white;
  }
  .hafen-header {
    margin-top: -15px;
  }
  .hafen-toolbar {
    background: var(--themeColor);
  }
  .user-options {
    display: flex;
  }
</style>
