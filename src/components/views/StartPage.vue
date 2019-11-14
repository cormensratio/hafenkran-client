<template>
  <base-page>
    <template slot="body">
      <div class="container">
        <h1 class="m-2">Welcome to Hafenkran</h1>
        <div class="card">
          <h3 class="card-title text-muted mt-2"> Please login </h3>
          <div class="m-auto">
            <v-btn class="m-3" to="'/login'"> Login </v-btn>
            <v-btn class="m-3" to="'/newexperiment'"> Test Upload </v-btn>
            <v-btn class="m-3" to="'/experimentlist'"> Go To Experimentlist </v-btn>
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
