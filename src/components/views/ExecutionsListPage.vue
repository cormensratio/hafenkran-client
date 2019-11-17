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
              <td class="text-xs-left">{{ props.item.id }}</td>
              <td class="text-xs-left">
                {{ getTimeStamp(props.item.startedAt) ? null : 'Not started yet' }}
              </td>
              <td class="text-xs-left">
                {{ getTimeStamp(props.item.terminatedAt) ? null : 'Not terminated yet'}}
              </td>
              <td class="text-xs-left">
                <status-cell :status="props.item.status"></status-cell>
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
        { text: 'Experiment', sortable: true, value: 'id' },
        { text: 'Started at', sortable: true, value: 'startedAt' },
        { text: 'Terminated at', sortable: true, value: 'terminatedAt' },
        { text: 'status', sortable: true, value: 'status' },
      ],
    };
  },
  computed: {
    ...mapGetters(['executions']),
  },
  methods: {
    ...mapActions(['fetchExecutionsByExperimentId']),
  },
  created() {
    // this.fetchExecutionsByExperimentId();
  },
};
</script>

<style scoped>
.title {
  font-size: 14pt;
}
</style>
