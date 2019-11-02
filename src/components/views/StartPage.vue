<template>
  <base-page>
    <template slot="body">
      <div>
        <a href="/fileupload">Upload your File</a>
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
