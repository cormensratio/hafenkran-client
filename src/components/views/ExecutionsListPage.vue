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
              <tr>
                <td class="text-xs-left">{{ props.item.name }}</td>
                <td class="text-xs-left" v-if="user.isAdmin">
                  {{ getUserNameFromId(props.item.ownerId) }}
                </td>
                <td class="text-xs-left">
                  {{ getTimeStamp(props.item.createdAt) || 'Not started yet' }}
                </td>
                <td class="text-xs-left">
                  {{ getTimeStamp(props.item.terminatedAt) || 'Not terminated yet'}}
                </td>
                <td class="text-xs-left">
                  <status-cell :status="props.item.status"></status-cell>
                </td>
                <td class="justify-center action-column">
                  <div class="action-container">
                    <v-tooltip bottom class="mr-1">
                      <template v-slot:activator="{ on }">
                        <v-icon @click="navigateToDetails(props.item.id)"
                                color="black" dark v-on="on">info
                        </v-icon>
                      </template>
                      <span>Execution Details</span>
                    </v-tooltip>
                    <v-tooltip v-if="!hasTerminated(props.item.status)"
                               bottom class="mr-1">
                      <template v-slot:activator="{ on }">
                        <v-icon @click="executionCancel(props.item.id)"
                                color="black" dark v-on="on">cancel
                        </v-icon>
                      </template>
                      <span>Cancel Execution</span>
                    </v-tooltip>
                    <v-tooltip v-else class="mr-1" bottom>
                      <template v-slot:activator="{ on }">
                        <v-icon @click="showContextMenu($event, props.item.experimentId)"
                                color="black" dark v-on="on">replay
                        </v-icon>
                      </template>
                      <span>Repeat Execution</span>
                    </v-tooltip>
                    <v-tooltip bottom class="mr-1">
                      <template v-slot:activator="{ on }">
                        <v-icon @click="setExecution(props.item)"
                                :disabled="!hasTerminated(props.item.status)"
                                color="red" dark v-on="on">delete
                        </v-icon>
                      </template>
                      <span>Delete Execution</span>
                    </v-tooltip>
                  </div>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
        <delete-dialog @deleteClicked="executionDelete"
                       @hideDialog="deleteDialog = false"
                       :id="selectedExecution.id"
                       :extern-dialog="deleteDialog"
                       :header-message="'Are you sure you want to delete this Execution?'"
        />
        <v-progress-circular
          size="50"
          indeterminate
          color="#106ee0"
          v-if="loading"
        />
      </div>
      <v-menu v-model="showMenu"
              :position-x="menuPosX"
              :position-y="menuPosY"
              :close-on-content-click="false"
              :close-on-click="false"
      >
        <StartExperimentMenu :experiment="selectedExperiment"
                             @menuClosed="closeMenu">
        </StartExperimentMenu>
      </v-menu>
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
import DeleteDialog from '../baseComponents/DeleteDialog';
import UsersMixin from '../../mixins/UsersMixin';


export default {
  name: 'ExecutionsListPage',
  components: { DeleteDialog,
    ExecutionFilters,
    BaseListHeader,
    StatusCell,
    BasePage,
    StartExperimentMenu },
  mixins: [TimeStampMixin, FilterMixin, UsersMixin],
  data() {
    return {
      search: '',
      showMenu: false,
      selectedExperiment: {},
      menuPosX: 0,
      menuPosY: 0,
      loading: false,
      deleteDialog: false,
      selectedExecution: {},
      headers: [
        { text: 'Experiment', sortable: true, value: 'name' },
        { text: 'Owner', value: 'ownerId', sortable: false },
        { text: 'Started at', sortable: true, value: 'createdAt' },
        { text: 'Terminated at', sortable: true, value: 'terminatedAt' },
        { text: 'Status', sortable: true, value: 'status' },
        { text: 'Actions', sortable: false, align: 'center', width: '10%' },
      ],
    };
  },
  computed: {
    ...mapGetters(['executions', 'user', 'experiments']),
  },
  methods: {
    ...mapActions(['fetchAllExecutionsOfUser', 'cancelExecution', 'deleteExecution', 'fetchUserList', 'triggerSnack']),
    ...mapMutations(['setSnack', 'showSnack']),
    navigateToDetails(id) {
      this.$router.push(`/execution/${id}`);
    },
    setExecution(item) {
      this.deleteDialog = !this.deleteDialog;
      this.selectedExecution = item;
    },
    async executionCancel(id) {
      this.loading = true;
      const canceledExecution = await this.cancelExecution(id);
      if (canceledExecution !== null) {
        this.setSnack(`${canceledExecution.name} has been canceled`);
      } else {
        this.setSnack('Execution could not be canceled');
      }
      this.loading = false;
      this.triggerSnack();
    },
    async executionDelete(id) {
      this.deleteDialog = false;
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

    showContextMenu(event, experimentId) {
      this.updateSelectedExperiment(experimentId);
      this.showMenu = false;
      this.menuPosX = event.clientX;
      this.menuPosY = event.clientY;
      this.$nextTick(() => {
        this.showMenu = true;
      });
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
  async created() {
    await this.fetchUserList();
    await this.fetchAllExecutionsOfUser();
    this.$nextTick(() => {
      this.items = this.executions;
    });
  },
};
</script>

<style scoped>
  .action-container {
    display: flex;
    justify-content: space-between;
  }
</style>
