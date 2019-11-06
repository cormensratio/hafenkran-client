<template>
  <base-page>
    <template slot="body">
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
  #upload {
    position: relative;
    padding-top: 4%;
  }
</style>
