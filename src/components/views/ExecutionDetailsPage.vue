<template>
  <base-page>
    <template slot="body">
      <v-container class="top">
        <v-layout column>
          <v-flex>
            <v-card class="flex">
              <v-toolbar dark style="background: var(--themeColor)">
                <v-toolbar-title color="white" class="justify-center">
                  {{ execution.name }}
                </v-toolbar-title>
              </v-toolbar>
              <v-card-text class="text-left details">
            <span class="mb-3">
              Start Date: {{ getTimeStamp(execution.startedAt) || '-' }}
            </span>
                <span class="mb-3">Runtime: {{runtime}}</span>
                <div class="status">
                  <span>Status:</span>
                  <status-cell :status="execution.status" class="cell"/>
                </div>
              </v-card-text>
              <v-progress-circular
                indeterminate
                color="#106ee0"
                v-if="loading"
              />
              <v-card-actions>
                <v-flex>
                  <v-btn class="logs left" dark style="background-color: var(--themeColor)"
                         @click="getLogs">
                    Load Logs
                  </v-btn>
                  <v-btn dark style="background-color: var(--themeColor)"
                         @click="downloadResults()" class="left">
                    Download Results
                    <v-icon right>cloud_download</v-icon>
                  </v-btn>
                  <v-btn class="error right"
                         @click="setExecution()">Delete</v-btn>
                  <v-btn class="right"
                         @click="executionCancel(execution.id)">
                    Cancel execution
                    <v-icon right dark>cancel</v-icon>
                  </v-btn>
                </v-flex>
              </v-card-actions>
              <delete-dialog @deleteClicked="executionDelete"
                             @hideDialog="dialog = false"
                             :extern-execution="execution"
                             :extern-dialog="dialog"
              ></delete-dialog>
            </v-card>
          </v-flex>
          <v-flex class="mt-2">
            <v-card class="results elevation-5">
              <v-tabs dark centered icons-and-text grow slider-color="white">
                <v-tab class="color-theme-blue" @click="activeTab=1">Logs
                  <v-icon>description</v-icon>
                </v-tab>
                <v-tab class="color-theme-blue" @click="activeTab=2">Statistics
                  <v-icon>timeline</v-icon>
                </v-tab>
              </v-tabs>
            </v-card>
            <div class="content">
              <div v-if="activeTab === 1">
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
              <div v-if="activeTab === 2">
                <execution-statistics-page :execution-id="execution.id">
                </execution-statistics-page>
              </div>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </template>
  </base-page>
</template>

<script>
import { isNil, forEach } from 'lodash';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import moment from 'moment';
import BasePage from '../baseComponents/BasePage';
import TimeStampMixin from '../../mixins/TimeStamp';
import StatusCell from '../baseComponents/StatusCell';
import ExecutionDetailService from '../../service/ExecutionDetailService';
import ExecutionStatisticsPage from './ExecutionStatisticsPage';
import DeleteDialog from '../baseComponents/DeleteDialog';

export default {
  name: 'ExecutionDetailsPage',
  mixins: [TimeStampMixin],
  components: { DeleteDialog, ExecutionStatisticsPage, StatusCell, BasePage },
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
    };
  },
  props: {
    executionId: String,
  },
  computed: {
    ...mapGetters(['executions']),
  },
  methods: {
    ...mapActions(['getExecutionById', 'terminateExecution', 'deleteExecution', 'triggerSnack', 'fetchAllExecutionsOfUser']),
    ...mapMutations(['setSnack', 'showSnack']),
    getLogs() {
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
    },
    setExecution() {
      this.dialog = !this.dialog;
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
      const terminated = moment(this.execution.terminatedAt);
      const startedAt = moment(this.execution.startedAt);
      const now = moment(new Date());
      switch (this.execution.status) {
        case 'RUNNING':
          this.runtime = this.msToTime(moment(now.diff(startedAt)));
          break;
        case 'TERMINATED':
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
  },
  async created() {
    if (!isNil(this.executions) && this.executions.length > 0) {
      await this.fetchAllExecutionsOfUser();
    }
    this.getExecutionById(this.executionId)
      .then((execution) => {
        if (!isNil(execution)) {
          this.execution = execution;
        }
      });
    setInterval(() => {
      this.calculateRuntime();
    }, 1000);
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
  .color-theme-blue {
    background: var(--themeColor);
  }

  .statistics-page {
    height: 100%;
    width: 100%;
  }
</style>
