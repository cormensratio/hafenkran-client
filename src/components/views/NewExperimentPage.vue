<template>
  <base-page>
    <template slot="body">
      <v-container>
        <v-layout>
          <v-card class="mx-auto light-blue" width="750">
            <v-card-title class="m-1 white--text justify-center h1 p-0" >
              Upload
            </v-card-title>
            <file-upload class="pt-0">
              <template slot="button">
                <v-btn :to="'/experimentlist'">Show Experiments</v-btn>
              </template>
            </file-upload>
          </v-card>
        </v-layout>
      </v-container>
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
