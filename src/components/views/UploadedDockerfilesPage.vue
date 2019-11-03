<template>
  <base-page>
      <template slot="body">
        <div id="app">
          <v-app id="inspire">
            <v-data-table
              :headers="headers"
              :items="uploadedDockerImages"
              :items-per-page="10"
              class="elevation-1"
            ></v-data-table>
          </v-app>
        </div>
      </template>
  </base-page>
</template>

<script>
import BasePage from '../baseComponents/BasePage';

export default {
  name: 'UploadedDockerfilesPage',
  components: { BasePage },
  data() {
    return {
      headers: [
        {
          text: 'Dockerfile Name',
          align: 'left',
          sortable: true,
          value: 'name',
        },
        { text: 'Uploaded', value: 'uploadDate' },
        { text: 'Size', value: 'size' },
      ],
      uploadedDockerImages: [
        {
          name: 'Pi calculation',
          uploadDate: 24,
          size: 120,
        },
        {
          name: 'Gingerbread',
          uploadDate: 16,
          size: 350,
        },
        {
          name: 'Honeycomb',
          uploadDate: 48,
          size: 300,
        },
      ],
    };
  },
};
</script>

<style scoped>

</style>
