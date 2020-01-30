<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <base-page>
    <template slot="body">
      <div class="container">
        <v-card class="flex">
          <v-toolbar dark style="background: var(--themeColor)">
            <v-toolbar-title color="white" class="justify-center">
              {{ execution.name }}
            </v-toolbar-title>
            <v-toolbar-items class="ml-5">
              <v-btn flat dark @click="activeTab = 1"
                     v-bind:class="{ 'active': (activeTab === 1)}">
                <v-icon class="mr-1">info</v-icon>
                General Information
              </v-btn>
              <v-btn flat dark @click="activeTab = 2"
                     v-bind:class="{ 'active': (activeTab === 2)}">
                <v-icon class="mr-1">insert_chart</v-icon>
                Statistics
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <div v-if="activeTab === 1">
            <v-card-text class="row">
              <div class="column text-lg-left mr-5 ml-2" style="width: 25%">
                <h3>Execution Info</h3>
                <p>Start Date: {{ getTimeStamp(execution.startedAt) || '-' }}</p>
                <p>Runtime: {{runtime}}</p>
                <div class="status">
                  <span>Status:</span>
                  <status-cell :status="execution.status" class="cell"/>
                </div>
              </div>
              <div class="column text-lg-left">
                <h3>Selected Options</h3>
                <p>CPU Cores: {{execution.cpu}} MilliCore</p>
                <div class="ram-info">
                  RAM:
                  <file-size-cell class="ml-1" :size="convertKibiBytesToBytes(execution.ram)"/>
                </div>
                <p>Max Runtime: {{msToTime(execution.bookedTime * 1000)}}</p>
              </div>
            </v-card-text>
            <v-progress-circular
              indeterminate
              color="#106ee0"
              v-if="loading"
            />
            <v-card-actions>
              <v-layout class="justify-space-between buttons">
                <v-layout class="justify-start align-end">
                  <v-select :items="intervals"
                            label="Log Fetching Interval"
                            item-text="title"
                            item-value="value"
                            outline
                            style="max-width: 200px; max-height: 60px; margin-bottom: 0px;"
                            v-model="selectedInterval"
                            @change="selectInterval()">
                  </v-select>
                  <v-btn v-if="selectedInterval === 0"
                         dark
                         style="background-color: var(--themeColor)"
                         @click="getLogs">
                    Load Logs manually
                  </v-btn>
                  <v-btn dark
                         style="background-color: var(--themeColor); margin-left: 2px"
                         @click="downloadResults()">
                    Download Results
                    <v-icon right>cloud_download</v-icon>
                  </v-btn>
                </v-layout>
                <v-layout class="justify-end align-end">
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-btn v-if="!hasTerminated(execution.status)" class="replay"
                             @click="executionCancel(execution.id)" v-on="on">
                        <v-icon right dark left>cancel</v-icon>
                      </v-btn>
                      <v-btn class="replay" v-else
                             @click="showContextMenu($event, execution.experimentId)" v-on="on">
                        <v-icon>replay</v-icon>
                      </v-btn>
                    </template>
                    <span v-if="!hasTerminated(execution.status)">Cancel this Execution</span>
                    <span v-else>Repeat this execution</span>
                  </v-tooltip>
                  <v-btn class="error"
                         @click="setExecution()">
                    <v-icon>delete</v-icon>
                  </v-btn>
                </v-layout>
              </v-layout>
            </v-card-actions>
            <div class="m-1">
              <v-container class="scroll-y black white--text">
                <v-layout column
                          style="height: 25vh">
                  <div class="text-left">Logs are getting updated here:</div>
                  <div class="text-left"
                       :key="id" v-for="(log, id) in logs">{{ log }}
                  </div>
                  <v-progress-circular
                    indeterminate
                    color="#106ee0"
                    v-if="loadingLogs"
                  />
                </v-layout>
              </v-container>
              <v-text-field
                v-model="userInput"
                append-icon="send"
                label="Enter a command here!"
                single-line
                @keyup.enter="sendStdin"
                @click:append="sendStdin()"
                type="text"
                clearable
                clear-icon="close"
                outline
              />
            </div>
          </div>
          <div v-if="activeTab === 2" class="mt-2 p-2">
            <execution-statistics-page :execution-id="execution.id">
            </execution-statistics-page>
          </div>
          <delete-dialog @deleteClicked="executionDelete"
                         @hideDialog="dialog = false"
                         :extern-execution="execution"
                         :extern-dialog="dialog"
          ></delete-dialog>
        </v-card>
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
      </div>
    </template>
  </base-page>
</template>

<script>
import { find, forEach, isEqual, isNil } from 'lodash';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import moment from 'moment';
import StartExperimentMenu from '../baseComponents/StartExperimentMenu';
import BasePage from '../baseComponents/BasePage';
import TimeStampMixin from '../../mixins/TimeStamp';
import StatusCell from '../baseComponents/StatusCell';
import ExecutionDetailService from '../../service/ExecutionDetailService';
import ExecutionStatisticsPage from './ExecutionStatisticsPage';
import DeleteDialog from '../baseComponents/DeleteDialog';
import FileSizeCell from '../baseComponents/FileSizeCell';

export default {
  name: 'ExecutionDetailsPage',
  mixins: [TimeStampMixin],
  components: {
    FileSizeCell,
    DeleteDialog,
    ExecutionStatisticsPage,
    StatusCell,
    BasePage,
    StartExperimentMenu,
  },
  data() {
    return {
      userInput: '',
      execution: {},
      runtime: '',
      activeTab: 1,
      logs: [],
      loading: false,
      loadingLogs: false,
      dialog: false,
      selectedExecution: {},
      menuPosX: 0,
      menuPosY: 0,
      showMenu: false,
      selectedExperiment: {},
      intervals: [
        { title: 'off', value: 0 },
        { title: 'every 5 seconds', value: 5 },
        { title: 'every 10 seconds', value: 10 },
        { title: 'every 30 seconds', value: 30 },
        { title: 'every minute', value: 60 },
      ],
      selectedInterval: 0,
      runningInterval: null,
    };
  },
  props: {
    executionId: String,
  },
  computed: {
    ...mapGetters(['snack', 'snackShow', 'executions', 'experiments']),
  },
  methods: {
    ...mapActions(['getExecutionById', 'cancelExecution', 'deleteExecution', 'triggerSnack', 'fetchAllExecutionsOfUser']),
    ...mapMutations(['setSnack', 'showSnack']),
    getLogs() {
      if (this.execution.status === 'RUNNING'
        || this.execution.status === 'WAITING') {
        this.loadingLogs = true;
        ExecutionDetailService.getExecutionLogsbyId(this.executionId)
          .then((newLog) => {
            this.loadingLogs = false;
            if (!isNil(newLog)) {
              this.logs = [];
              const logArray = newLog.split(/\r?\n/);
              forEach(logArray, log => this.logs.push(log));
            } else {
              this.setSnack('Couldn\'t fetch any logs');
              this.triggerSnack();
            }
          });
      } else if (!isNil(this.runningInterval)) {
        clearInterval(this.runningInterval);
        this.runningInterval = null;
        this.selectedInterval = 0; // sets the Log Fetching Interval to 'off'
      }
    },
    selectInterval() {
      if (this.selectedInterval === 0) {
        if (!isNil(this.runningInterval)) {
          clearInterval(this.runningInterval);
        }
        this.setSnack('Auto-reloading Logs turned off');
        this.triggerSnack();
        this.getLogs();
      } else {
        if (!isNil(this.runningInterval)) {
          clearInterval(this.runningInterval);
        }
        this.setSnack(`Logs are now getting fetched every ${this.selectedInterval} seconds`);
        this.triggerSnack();
        this.runningInterval = setInterval(() => {
          this.getLogs();
        }, this.selectedInterval * 1000);
      }
    },
    setExecution() {
      this.dialog = !this.dialog;
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
      this.dialog = false;
      this.loading = true;
      console.log(id);
      const deletedExecution = await this.deleteExecution(id);
      if (deletedExecution !== null) {
        this.setSnack(`${deletedExecution.name} has been deleted`);
        this.$router.push('/executionlist');
      } else {
        this.setSnack('Execution could not be deleted');
      }
      this.loading = false;
      this.triggerSnack();
    },
    calculateRuntime() {
      if (!isNil(this.execution.startedAt) && !isNil(this.execution.terminatedAt)) {
        const terminated = moment(this.execution.terminatedAt);
        const startedAt = moment(this.execution.startedAt);
        const now = moment(new Date());
        switch (this.execution.status) {
          case 'RUNNING':
            this.runtime = this.msToTime(moment(now.diff(startedAt)));
            break;
          case 'FINISHED':
          case 'FAILED':
          case 'ABORTED':
          case 'CANCELED':
            this.runtime = this.msToTime(moment(terminated)
              .diff(startedAt));
            break;
          case 'WAITING':
            this.runtime = 'This execution has not started yet!';
            break;
          case '':
          default:
            this.runtime = 'There has been an Error!';
            break;
        }
      } else {
        this.runtime = 'Runtime cannot be calculated yet';
      }
    },
    pad(num) {
      return (`0${num}`).slice(-2);
    },
    msToTime(ms) {
      let secs = Math.floor(ms / 1000);
      let minutes = Math.floor(secs / 60);
      secs %= 60;
      const hours = Math.floor(minutes / 60);
      minutes %= 60;
      return `${this.pad(hours)}h:${this.pad(minutes)}min:${this.pad(secs)}s`;
    },
    async sendStdin() {
      if (!isNil(this.userInput) || !this.userInput.equals('')) {
        await ExecutionDetailService.postUserInput(this.userInput, this.executionId);
      }
      this.userInput = '';
    },
    async downloadResults() {
      let downloaded = false;
      this.loading = true;
      downloaded =
          await ExecutionDetailService.downloadResults(this.execution.id, this.execution.name);
      this.loading = false;
      if (!downloaded) {
        this.setSnack('Could\'t download results');
        this.triggerSnack();
      }
    },
    closeMenu() {
      this.showMenu = false;
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
    showContextMenu(event) {
      this.updateSelectedExperiment(this.execution.experimentId);
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
    updateExecution() {
      this.getExecutionById(this.executionId)
        .then((execution) => {
          if (!isNil(execution)) {
            this.execution = execution;
          }
        });
    },
    convertKibiBytesToBytes(value) {
      if (!isNil(value) && !isNaN(value)) {
        return value * 1000;
      }
      return 0;
    },
  },
  watch: {
    executions() {
      this.updateExecution();
    },
  },
  async created() {
    if (!isNil(this.executions) && this.executions.length > 0) {
      await this.fetchAllExecutionsOfUser();
    }
    this.updateExecution();
    setInterval(() => {
      this.calculateRuntime();
    }, 1000);
    if (this.selectedInterval !== 0) {
      this.runningInterval = setInterval(() => {
        this.getLogs();
      }, this.selectedInterval);
    }
  },
  beforeDestroy() {
    clearInterval(this.runningInterval);
    this.runningInterval = null;
  },
};
</script>

<style scoped>
  .details {
    display: flex;
    flex-direction: column;
    font-size: 12pt;
  }

  .status {
    display: flex;
    flex-direction: row;
  }

  .cell {
    margin-top: -8px;
    margin-left: 5px;
  }

  .ram-info {
    display: flex;
    margin-bottom: 16px;
  }

  .color-theme-blue {
    background: var(--themeColor);
  }

  .statistics-page {
    height: 100%;
    width: 100%;
  }

  .active {
    background-color: #307dea;
  }

  .buttons > * > * {
    margin-left: 2px;
    margin-right: 2px;
  }
</style>
