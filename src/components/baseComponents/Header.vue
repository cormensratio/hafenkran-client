<template>
  <div class="hafen-header pb-1">
    <v-toolbar height="75vh" color="blue" class="hafen-toolbar">
      <v-toolbar-title class="mr-5 pt-2" @click="navigateToStartPage()">
        <img class="hafen-logo" src="../../assets/hafenkran.png">
        <span>HAFENKRAN</span>
      </v-toolbar-title>
      <v-toolbar-items v-if="isAuthenticated">
        <v-btn flat to="/experimentlist">Experiments</v-btn>
        <v-btn flat to="/executionlist">Executions</v-btn>
        <v-btn flat to="/newexperiment">Upload</v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-else>
        <v-btn flat to="/">Home</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <div v-if="isAuthenticated">
        <v-btn flat @click="logoutUser()">
          Logout
        </v-btn>
        <v-avatar color="white" dark round>
          <span class="headline">{{ user.name.charAt(0) }}</span>
        </v-avatar>
      </div>
      <div v-else>
        <v-btn flat class="m-3" to="/login"> Login </v-btn>
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
    navigateToStartPage() {
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>

  .hafen-logo {
    width: 65px;
    height: 65px;
  }

  .hafen-header {
    margin-top: -15px;
  }

</style>
