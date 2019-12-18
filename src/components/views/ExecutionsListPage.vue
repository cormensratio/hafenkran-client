<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <base-page>
    <template slot="body">
      <div class="container">
        <v-card>
          <v-toolbar color="blue" dark>
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
              <td class="text-xs-left">{{ props.item.name }}</td>
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
                <v-btn @click="navigateToDetails(props.item.id)">Details</v-btn>
                <v-btn v-if="!hasTerminated(props.item.status)"
                       @click="terminateExecution(props.item.id)">Cancel</v-btn>
                <v-btn @click="deleteExecution(props.item.id)">Delete</v-btn>
                <v-menu v-model="showMenu"
                        :close-on-content-click="false"
                        :close-on-click="true"
                >
                  <template v-slot:activator="{ on }">
                    <v-btn v-if="hasTerminated(props.item.status)" v-on="on"
                           @click="updateSelectedExperiment(props.item.experimentId)">
                      Repeat
                    </v-btn>
                  </template>
                  <StartExperimentMenu :experiment="selectedExperiment"
                                       @menuClosed="closeMenu">
                  </StartExperimentMenu>
                </v-menu>
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
import { isNil, isEqual, find } from 'lodash';
import BasePage from '../baseComponents/BasePage';
import TimeStampMixin from '../../mixins/TimeStamp';
import StatusCell from '../baseComponents/StatusCell';
import StartExperimentMenu from '../baseComponents/StartExperimentMenu';


export default {
  name: 'ExecutionsListPage',
  components: { StatusCell, BasePage, StartExperimentMenu },
  mixins: [TimeStampMixin],
  data() {
    return {
      terminated: '',
      search: '',
      showMenu: false,
      selectedExperiment: {},
      headers: [
        { text: 'Experiment', sortable: true, value: 'name' },
        { text: 'Started at', sortable: true, value: 'createdAt' },
        { text: 'Terminated at', sortable: true, value: 'terminatedAt' },
        { text: 'Status', sortable: true, value: 'status' },
        { text: 'Actions', sortable: false },
      ],
    };
  },
  computed: {
    ...mapGetters(['executions', 'experiments']),
  },
  methods: {
    ...mapActions(['fetchAllExecutionsOfUser', 'terminateExecution', 'deleteExecution', 'getExperimentFromId']),
    navigateToDetails(id) {
      this.$router.push(`/execution/${id}`);
    },
    hasTerminated(status) {
      if (!isNil(status)) {
        if (isEqual(status, 'RUNNING')) {
          return false;
        } else if (isEqual(status, 'WAITING')) {
          return false;
        }
        return true;
      }
      return false;
    },

    closeMenu() {
      this.showMenu = false;
    },

    updateSelectedExperiment(experimentId) {
      this.selectedExperiment = find(this.experiments, exp => exp.id === experimentId);
    },
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
