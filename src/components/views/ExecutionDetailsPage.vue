<template>
  <base-page>
    <template slot="body">
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
            <v-btn class="red" :disabled="cancelButtonDisabled"
                   @click="terminateExecution(execution.id)">
              Cancel execution
              <v-icon right dark>cancel</v-icon>
            </v-btn>
            <v-btn class="blue" @click="calculateRuntime">
              Download logs
              <v-icon right>cloud_download</v-icon>
            </v-btn>
          </div>
        </v-card>
      </v-container>
      <v-container class="bottom">
        <v-flex>
          <v-card class="results elevation-10">
            <v-tabs color="blue" dark centered icons-and-text grow>
              <v-tabs-slider></v-tabs-slider>
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
              <v-card flat>
                <v-card-text class="logs">
                </v-card-text>
              </v-card>
            </div>
            <div v-if="activetab === 2" class="tab-content">
              <v-card flat>
                <v-card-text class="statistics">
                </v-card-text>
              </v-card>
            </div>
          </div>
        </v-flex>
      </v-container>
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


export default {
  name: 'ExecutionDetailsPage',
  mixins: [timeStampMixin],
  components: { StatusCell, BasePage },
  data() {
    return {
      execution: {},
      runtime: '',
      activetab: 1,
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
        if (!isEqual(status, 'RUNNING')) {
          disabled = false;
        } else if (!isEqual(status, 'WAITING')) {
          disabled = false;
        }
      }
      return disabled;
    },
  },
  methods: {
    ...mapActions(['getExecutionById', 'terminateExecution']),
    calculateRuntime() {
      const terminated = moment(this.execution.terminatedAt);
      const now = moment(new Date());
      switch (this.execution.status) {
        case 'RUNNING':
          this.runtime = this.msToTime(now.diff(terminated));
          break;
        case 'TERMINATED':
        case 'FAILED':
        case 'ABORTED':
        case 'CANCELED':
          this.runtime = this.msToTime(moment(this.execution.startedAt)
            .diff(terminated));
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
</style>
