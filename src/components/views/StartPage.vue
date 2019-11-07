<template>
  <base-page>
    <template slot="body">
      <div class="container">
        <h1 class="m-2">Welcome to Hafenkran</h1>
        <div class="card">
          <div class="card-title text-muted"> Please login </div>
          <div class="m-auto">
            <v-btn class="m-3" :href="'/login'"> Login </v-btn>
            <v-btn class="m-3" :href="'/register'"> Register </v-btn>
            <v-btn class="m-3" :href="'/newexperiment'"> Test Upload </v-btn>
          </div>
        </div>
      </div>
    </template>
  </base-page>
</template>

<script>
import BasePage from '../baseComponents/BasePage';
import Header from '../baseComponents/Header';


export default {
  name: 'StartPage',
  components: { BasePage, Header },
};
</script>

<style scoped>

</style>
