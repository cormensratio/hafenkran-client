<template>
  <base-page>
    <template slot="body">
      <div class="container pb-5">
        <v-container class="top">
          <v-card class="flex">
            <v-card-title>
              <div class="execution-title">
                <span class="title-text">{{execution.name}}</span>
              </div>
            </v-card-title>
            <v-card-text class="text-left details">
            <span class="mb-3">
              Start Date: {{ getTimeStamp(execution.startedAt) || '-' }}
            </span>
              <span class="mb-3">Runtime: {{runtime}}</span>
              <div class="status">
                <span>Current status:</span>
                <status-cell :status="execution.status" class="cell"></status-cell>
              </div>
            </v-card-text>
            <div class="buttons">
              <v-btn class="logs" @click="getLogs">Load Logs
              </v-btn>
              <v-btn class="red" :disabled="cancelButtonDisabled"
                     @click="terminateExecution(execution.id)">
                Cancel execution
                <v-icon right dark>cancel</v-icon>
              </v-btn>
              <v-btn class="red" @click="deleteExecution(execution.id)">
                Delete
              </v-btn>
              <v-btn class="blue" @click="downloadResults()">
                Download Results
                <v-icon right>cloud_download</v-icon>
              </v-btn>
            </div>
          </v-card>
        </v-container>
        <v-container class="bottom" >
          <v-flex>
            <v-card class="results elevation-5">
              <v-tabs color="blue" dark centered icons-and-text grow slider-color="white">
                <v-tab href="#tab-1" @click="activetab=1">Logs
                  <v-icon>description</v-icon>
                </v-tab>
                <v-tab href="#tab-2" @click="activetab=2">Statistics
                  <v-icon>timeline</v-icon>
                </v-tab>
              </v-tabs>
            </v-card>
            <div class="content">
              <div v-if="activetab === 1" class="tab-content">
                <v-container
                  id="scroll-target"
                  style="max-height: 400px"
                  class="scroll-y black white--text"
                >
                  <v-layout
                    column
                    style="height: 300px"
                  >
                    <div class="text-left">Logs are getting updated here:</div>
                    <div class="text-left" id="logText" >{{ logs }}</div>
                    <v-progress-circular
                      indeterminate
                      color="blue"
                      v-if="loading"
                    />
                  </v-layout>
                </v-container>
                <v-text-field
                  class="align-end bg-white"
                  v-model="userInput"
                  single-line
                  append-icon="send"
                  label="Enter a command here!"
                  @click:append="sendStdin()"
                  clearable
                  clear-icon="close"
                  type="text"
                  outline
                />
              </div>
              <div v-if="activetab === 2" class="tab-content">
              </div>
            </div>
          </v-flex>
        </v-container>
      </div>

    </template>
  </base-page>
</template>

<script>
import { isNil, isEqual } from 'lodash';
import { mapActions } from 'vuex';
import moment from 'moment';
import BasePage from '../baseComponents/BasePage';
import { timeStampMixin } from '../../mixins/TimeStamp';
import StatusCell from '../baseComponents/StatusCell';
import ExecutionDetailService from '../../service/ExecutionDetailService';

export default {
  name: 'ExecutionDetailsPage',
  mixins: [timeStampMixin],
  components: { StatusCell, BasePage },
  data() {
    return {
      userInput: '',
      execution: {},
      runtime: '',
      activetab: 1,
      logs: '',
      loading: false,
    };
  },
  props: {
    executionId: String,
  },
  computed: {
    cancelButtonDisabled() {
      const status = this.execution.status;
      let disabled = true;
      if (!isNil(status)) {
        if (!isEqual(status, 'RUNNING' || 'WAITING')) {
          disabled = false;
        }
      }
      return disabled;
    },
  },
  methods: {
    ...mapActions(['getExecutionById', 'terminateExecution', 'deleteExecution']),
    getLogs() {
      this.loading = true;
      ExecutionDetailService.getExecutionLogsbyId(this.executionId)
        .then((newLog) => {
          if (!isNil(newLog)) {
            this.logs = newLog;
            this.loading = false;
          }
        });
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
      await ExecutionDetailService.downloadResults(this.execution.id, this.execution.name);
    },
  },
  created() {
    this.getExecutionById(this.executionId)
      .then((execution) => {
        if (!isNil(execution)) {
          this.execution = execution;
        }
      });
  },
  beforeUpdate() {
    this.calculateRuntime();
  },
};
</script>

<style scoped>
  .buttons {
    display: flex;
    margin-top: 1%;
    padding-bottom: 1%;
    justify-content: flex-end;
  }

  .details {
    display: flex;
    flex-direction: column;
    font-size: 12pt;
  }

  .execution-title {
    margin: auto;
    display: flex;
    flex-direction: row;
  }

  .title-text {
    font-size: 18pt;
    text-decoration: underline;
  }

  .status {
    display: flex;
    flex-direction: row;
  }

  .cell {
    margin-top: -8px;
    margin-left: 5px;
  }
  #logText {
    padding-bottom: 20px;
    padding-top: 20px;
  }
</style>
