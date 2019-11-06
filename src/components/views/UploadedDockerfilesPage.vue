<template>
  <base-page>
      <template slot="body">
        <div class="container">
            <v-data-table
              :headers="headers"
              :items="experiments"
              :items-per-page="5"
              class="elevation-1"
            ><template v-slot:items="props">
              <td class="text-xs-left">{{ props.item.experimentName }}</td>
              <td class="text-xs-left">{{ props.item.createdAt }}</td>
              <td class="text-xs-left">{{ props.item.size }}</td>
            </template>
            </v-data-table>
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
    };
  },
  created() {
    this.$store.dispatch('fetchExperiments');
  },
};
</script>

<style scoped>

</style>
