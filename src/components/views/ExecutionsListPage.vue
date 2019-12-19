<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <base-page>
    <template slot="body">
      <div class="container">
        <v-card>
          <base-list-header title="Executions">
            <template slot="expansion-body">
              <ExecutionFilters @applyFilters="applyFilters($event)"
                                @quickSearch="quickSearch($event)"
              >
              </ExecutionFilters>
            </template>
          </base-list-header>

          <v-data-table
            :headers="headers"
            :items="filteredItems"
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
                <v-btn @click="deleteExecution(props.item.id)">Delete</v-btn>
                <v-btn :disabled="cancelButtonDisabled(props.item.status)"
                       @click="executionCancel(props.item.id)">Cancel</v-btn>
                <v-dialog
                  v-model="dialog"
                  width="500">
                  <template v-slot:activator="{ on }">
                    <v-btn v-if="props.item.status === 'RUNNING'
                    || props.item.status === 'WAITING'" disabled>
                      Delete
                    </v-btn>
                    <v-btn v-else color="red lighten-2" dark v-on="on">
                      Delete
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      Are you sure you want to delete this Execution?
                    </v-card-title>
                    <v-card-actions>
                      <v-btn class="error"
                             @click="executionDelete(props.item.id), dialog = false">
                        Yes, I want to delete</v-btn>
                      <v-btn @click="dialog = false">No, I'm not sure</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </td>
            </template>
          </v-data-table>
        </v-card>
        <v-progress-circular
          size="50"
          indeterminate
          color="#106ee0"
          v-if="loading"
        />
        <v-snackbar v-model="snackShow" right>
          {{ snack }}
          <v-btn flat color="accent" @click.native="showSnackbar = false">Close</v-btn>
        </v-snackbar>
      </div>
    </template>
  </base-page>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { isNil, isEqual, find } from 'lodash';
import BasePage from '../baseComponents/BasePage';
import TimeStampMixin from '../../mixins/TimeStamp';
import StatusCell from '../baseComponents/StatusCell';
import StartExperimentMenu from '../baseComponents/StartExperimentMenu';
import BaseListHeader from '../baseComponents/BaseListHeader';
import ExecutionFilters from '../baseComponents/Filter/ExecutionFilters';
import FilterMixin from '../../mixins/FilterMixin';


export default {
  name: 'ExecutionsListPage',
  components: { ExecutionFilters, BaseListHeader, StatusCell, BasePage, StartExperimentMenu },
  mixins: [TimeStampMixin, FilterMixin],
  data() {
    return {
      terminated: '',
      search: '',
      showMenu: false,
      selectedExperiment: {},
      loading: false,
      dialog: false,
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
    ...mapGetters(['executions', 'snack', 'snackShow', 'experiments']),
  },
  methods: {
    ...mapActions(['fetchAllExecutionsOfUser', 'terminateExecution', 'deleteExecution', 'triggerSnack', 'getExperimentFromId']),
    ...mapMutations(['setSnack']),
    navigateToDetails(id) {
      this.$router.push(`/execution/${id}`);
    },
    async executionCancel(id) {
      this.loading = true;
      const canceledExecution = await this.terminateExecution(id);
      if (canceledExecution !== null) {
        this.setSnack(`${canceledExecution.name} has been canceled`);
      } else {
        this.setSnack('Execution could not be canceled');
      }
      this.loading = false;
      this.triggerSnack();
    },
    async executionDelete(id) {
      this.loading = true;
      const deletedExecution = await this.deleteExecution(id);
      if (deletedExecution !== null) {
        this.setSnack(`${deletedExecution.name} has been deleted`);
      } else {
        this.setSnack('Execution could not be deleted');
      }
      this.loading = false;
      this.triggerSnack();
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
    applyFilters(filters) {
      if (!isNil(filters)) {
        // Use object.assign so vue notices filters object was updated
        this.filters = Object.assign({}, filters);
      }
    },
    quickSearch(input) {
      this.search = input;
    },
  },
  watch: {
    executions() {
      this.items = this.executions;
    },
  },
  created() {
    this.fetchAllExecutionsOfUser();
    this.$nextTick(() => {
      this.items = this.executions;
    });
  },
};
</script>

<style scoped>

</style>
