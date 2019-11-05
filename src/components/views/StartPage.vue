<template>
  <base-page>
    <template slot="body">
      <div id="upload">
        <v-btn href="/fileupload">Upload your File</v-btn>
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
  #upload {
    position: relative;
    padding-top: 4%;
  }
</style>
