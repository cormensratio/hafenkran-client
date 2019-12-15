<template>
  <base-page>
    <template slot="body">
      <v-container>
        <v-layout>
          <v-card class="mx-auto white" width="750">
            <v-toolbar dark color="blue">
              <v-toolbar-title color="white" class="justify-center">
                Upload your experiment here:
              </v-toolbar-title>
            </v-toolbar>
            <file-upload class="pt-4">
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
