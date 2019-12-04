<template>
  <div class="page">
    <div class="float-left">
      <v-btn class="mx-2" fab dark color="blue" @click="navigationToggled">
        <v-icon >view_list</v-icon>
      </v-btn>
    </div>
    <div v-if="isAuthenticated" class="float-right">
      <v-btn color="blue" round dark @click="logoutUser()">
        Logout
      </v-btn>
      <v-avatar class="mx-2" color="blue" dark round @click="navigateToSettings()">
        <span class="white--text headline">{{ user.name.charAt(0) }}</span>
      </v-avatar>
    </div>
    <div v-else class="float-right">
      <v-btn class="m-3" :to="'/login'"> Login </v-btn>
    </div>
    <div class="hafen-header">
      <router-link to="/"><img src="../../assets/hafenkranlogo.svg" class="logo"></router-link>
    </div>
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
    navigationToggled() {
      this.$emit('navigationToggle');
    },
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
  },
};
</script>

<style scoped>
  .page {
    padding: auto;
    margin: auto;
  }

  .hafen-header {
    position: relative;
    height: 130px;
    width: 130px;
    margin: auto;
  }

  .logo {
    height: 100%;
    width: 100%;
    margin: auto;
    animation-name: shrink;
    animation-duration: 1s;
  }

  .logo:hover {
    animation-name: scaling;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
    -webkit-animation-fill-mode: forwards;
  }

  .logo:not(hover) {
    animation-name: leave;
    animation-duration: 1s;
    animation-fill-mode: forwards;
    -webkit-animation-fill-mode: forwards;
  }

  @keyframes scaling {
    50% {
      transform: scale(1.6, 1.6);
    }
    100% {
      transform: scale(1.5, 1.5);
    }
  }

  @keyframes leave {
    0% {
      transform: scale(1.5, 1.5);
    }
    100% {
      transform: scale(1, 1);
    }
  }
</style>
