<template>
  <base-page>
    <template slot="body">
      <div>
        <v-btn href="/UploadedDockerfilesPage">Click here</v-btn>
      </div>
    </template>
  </base-page>
</template>

<script>
import BasePage from '../baseComponents/BasePage';

export default {
  name: 'StartPage',
  components: { BasePage },
};
</script>

<style scoped>

</style>
