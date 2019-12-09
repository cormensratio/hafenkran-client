<template>
    <base-page>
      <template slot="body">
        <file-upload></file-upload>
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
