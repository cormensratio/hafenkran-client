<template>
  <base-page>
      <template slot="body">
        <div id="app">
          <v-app id="inspire">
            <v-data-table
              :headers="headers"
              :items="experimentsMock"
              :items-per-page="5"
              class="elevation-1"
            ><template v-slot:items="props">
              <td class="text-xs-left">{{ props.item.experimentName }}</td>
              <td class="text-xs-left">{{ props.item.createdAt }}</td>
              <td class="text-xs-left">{{ props.item.size }}</td>
            </template>
            </v-data-table>
          </v-app>
        </div>
      </template>
  </base-page>
</template>

<script>
import { mapGetters } from 'vuex';
import BasePage from '../baseComponents/BasePage';

export default {
  name: 'UploadedDockerfilesPage',
  components: { BasePage },

  computed: {
    ...mapGetters(['experiments']),
    ...mapGetters(['experimentsMock']),
  },
  data() {
    return {
      headers: [
        {
          text: 'Dockerfile Name',
          align: 'left',
          sortable: true,
          value: 'name',
        },
        { text: 'Uploaded', value: 'uploadDate', sortable: true },
        { text: 'Size', value: 'size', sortable: true },
      ],
      uploadedDockerfiles: [
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
