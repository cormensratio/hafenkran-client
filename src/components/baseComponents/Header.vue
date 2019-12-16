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
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <div v-if="isAuthenticated">
        <v-btn flat dark @click="logoutUser()">
          Logout
        </v-btn>
        <v-avatar color="white" dark round @click="navigateToSettings()" >
          <span class="headline">{{ user.name.charAt(0) }}</span>
        </v-avatar>
      </div>
      <div v-else>
        <v-btn flat dark class="m-3" to="/login"> Login </v-btn>
      </div>
    </v-toolbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Header',
  computed: {
    ...mapGetters(['isAuthenticated', 'user']),
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
        this.$router.push('/settings');
      } else {
        this.$router.push('/login');
      }
    },
    navigateToStartPage() {
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>

  .hafen-logo {
    width: 60px;
    height: 60px;
  }
  .logo-title {
    color: white;
  }
  .hafen-header {
    margin-top: -15px;
  }
  .hafen-toolbar {
    background: var(--themeColor);
  }

</style>
