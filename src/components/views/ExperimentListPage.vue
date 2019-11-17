<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <base-page>
      <template slot="body">
        <div class="container">
          <div>
            <v-data-table
              :headers="headers"
              :items="experiments"
              :items-per-page="5"
              class="elevation-1"
            ><template v-slot:items="props">
              <td class="text-xs-left">{{ props.item.name }}</td>
              <td class="text-xs-left">{{ getTimeStamp(props.item.createdAt)}}</td>
              <td class="text-xs-left">{{ props.item.size }}</td>
            </template>
            </v-data-table>
          </div>
          <div>
            <v-btn :to="'/newexperiment'"> Upload File </v-btn>
          </div>
        </div>
      </template>
  </base-page>
</template>

<script>
import moment from 'moment';
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
    getTimeStamp(utcTime) {
      return moment(utcTime).format('dddd, MMMM Do YYYY, h:mm:ss a');
    },
  },
  created() {
    this.fetchExperiments();
  },
};
</script>

<style scoped>

</style>
