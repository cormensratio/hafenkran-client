<template>
    <base-page>
      <template slot="body">
        <file-upload>
          <template slot="button">
            <v-btn :to="'/experimentlist'">Show Experiments</v-btn>
          </template>
        </file-upload>
      </template>
    </base-page>
</template>

<script>
import BasePage from '../baseComponents/BasePage';
import FileUpload from '../baseComponents/FileUpload';

export default {
  name: 'CreateNewExperiment',
  components: { FileUpload, BasePage },
};
</script>

<style scoped>

</style>
