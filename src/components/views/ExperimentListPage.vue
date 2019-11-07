<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
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
import { mapActions, mapGetters } from 'vuex';
import BasePage from '../baseComponents/BasePage';

export default {
  name: 'ExperimentListPage',
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
  methods: {
    ...mapActions(['fetchExperiments']),
  },
  created() {
    this.fetchExperiments();
  },
};
</script>

<style scoped>

</style>
