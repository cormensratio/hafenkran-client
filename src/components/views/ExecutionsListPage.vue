<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <base-page>
    <template slot="body">
      <div class="container">
        <v-card>
          <v-toolbar color="blue">
            <span class="title"> Executions </span>
            <v-spacer></v-spacer>
            <v-text-field append-icon="search"
                          label="Search"
                          single-line
                          v-model="search"
            >
            </v-text-field>
          </v-toolbar>
          <v-data-table
            :headers="headers"
            :items="executions"
            :search="search"
          >
            <template v-slot:items="props">
              <td class="text-xs-left">{{ props.item.executionName }}</td>
              <td class="text-xs-left">
                {{ getTimeStamp(props.item.createdAt) || 'Not started yet' }}
              </td>
              <td class="text-xs-left">
                {{ getTimeStamp(props.item.terminatedAt) || 'Not terminated yet'}}
              </td>
              <td class="text-xs-left">
                <status-cell :status="props.item.status"></status-cell>
              </td>
              <td class="text-xs-left">
                <v-btn>Details</v-btn>
                <v-btn :disabled="props.item.status !== 'RUNNING'"
                       @click="terminateExecution">Terminate</v-btn>
              </td>
            </template>
          </v-data-table>
        </v-card>
      </div>
    </template>
  </base-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BasePage from '../baseComponents/BasePage';
import { timeStampMixin } from '../../mixins/TimeStamp';
import StatusCell from '../baseComponents/StatusCell';


export default {
  name: 'ExecutionsListPage',
  components: { StatusCell, BasePage },
  mixins: [timeStampMixin],
  data() {
    return {
      search: '',
      headers: [
        { text: 'Experiment', sortable: true, value: 'executionName' },
        { text: 'Started at', sortable: true, value: 'createdAt' },
        { text: 'Terminated at', sortable: true, value: 'terminatedAt' },
        { text: 'Status', sortable: true, value: 'status' },
        { text: 'Actions', sortable: false },
      ],
    };
  },
  computed: {
    ...mapGetters(['executions']),
  },
  methods: {
    ...mapActions(['fetchAllExecutionsOfUser', 'getExperimentNameFromId', 'terminateExecution']),
  },
  created() {
    this.fetchAllExecutionsOfUser();
  },
};
</script>

<style scoped>
.title {
  font-size: 14pt;
}
</style>
