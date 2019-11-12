<template>
  <base-page>
    <template slot="body">
      <div class="container">
        <h1 class="text-danger"> TOP SECRET </h1>
      </div>
      <v-btn @click="logout"> Logout </v-btn>
    </template>
  </base-page>
</template>

<script>
import BasePage from '../baseComponents/BasePage';
import AuthenticationService from '../../service/AuthenticationService';

export default {
  name: 'ProtectedPage',
  components: { BasePage },
  methods: {
    logout() {
      AuthenticationService.logout();
      this.$router.push('/login');
    },
    getUserName() {

    },
  },
};
</script>

<style scoped>

</style>
