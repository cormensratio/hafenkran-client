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
      <v-spacer></v-spacer>
      <div v-if="isAuthenticated">
        <v-btn flat @click="logoutUser()">
          Logout
        </v-btn>
        <v-avatar color="white" dark round>
          <span class="white--text headline">{{ user.name.charAt(0) }}</span>
        </v-avatar>
      </div>
      <div v-else>
        <v-btn flat class="m-3" :to="'/login'"> Login </v-btn>
      </div>
    </v-toolbar>
<!--    <div class="float-left">-->
<!--      <v-btn class="mx-2" fab dark color="blue" @click="navigationToggled">-->
<!--        <v-icon >view_list</v-icon>-->
<!--      </v-btn>-->
<!--    </div>-->
<!--    <div v-if="isAuthenticated" class="float-right">-->
<!--      <v-btn color="blue" round dark @click="logoutUser()">-->
<!--        Logout-->
<!--      </v-btn>-->
<!--      <v-avatar class="mx-2" color="blue" dark round>-->
<!--        <span class="white&#45;&#45;text headline">{{ user.name.charAt(0) }}</span>-->
<!--      </v-avatar>-->
<!--    </div>-->
<!--    <div v-else class="float-right">-->
<!--      <v-btn class="m-3" :to="'/login'"> Login </v-btn>-->
<!--    </div>-->
<!--    <div class="hafen-header">-->
<!--      <router-link to="/"><img src="../../assets/hafenkranlogo.svg" class="logo"></router-link>-->
<!--    </div>-->
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
    navigateToStartPage() {
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
  .page {
    padding: auto;
    margin: auto;
    background-color: #2c3e50;
  }

  .hafen-toolbar {

  }

  .hafen-logo {
    width: 65px;
    height: 65px;
  }

  .hafen-header {
    margin-top: -15px;
    /*position: relative;*/
    /*height: 130px;*/
    /*width: 130px;*/
    /*margin: auto;*/

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
