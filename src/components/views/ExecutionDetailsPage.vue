<template>
  <base-page>
    <template slot="body">
      <div class="container">
        <v-container fluid>
        <v-layout row>
            <v-flex>
              <v-card flat>
                <v-card-text  align="left">{{execution.name}}</v-card-text>
                <v-card-text align="left">{{execution.status}}</v-card-text>
              </v-card>
            </v-flex>
            <v-flex>
               <v-card align="right" flat col>
                 <v-card-text >Cancel execution</v-card-text>
               </v-card>
            </v-flex>
            <v-flex>
              <v-card class="top_icons" flat align="right">
              <v-btn icon :disabled="execution.status !== 'RUNNING'"
              @click="terminateExecution(execution.id)">
                <v-icon class="top_icons">cancel</v-icon>
              </v-btn>
              </v-card>
            </v-flex>
            <v-flex>
               <v-card flat align="right">
                 <v-card-text>Download logs</v-card-text>
               </v-card>
            </v-flex>
            <v-flex>
               <v-card class="top_icons" flat align="right">
                 <v-btn @click="calculateRuntime" icon>
                   <v-icon>cloud_download</v-icon>
                 </v-btn>
               </v-card>
            </v-flex>
        </v-layout>
        <v-layout>
          <v-flex>
            <v-card>
              <v-card-text class="text-left">
              <span>Start Date: {{ getTimeStamp(execution.startedAt) }}</span>
              <v-spacer></v-spacer>
              <span>Runtime: {{runtime}}</span>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
        </v-container>
      </div>
      <v-container class="bottom">
        <v-flex>
          <v-card class="results elevation-10">
            <v-tabs color="blue" dark centered icons-and-text grow>
              <v-tabs-slider></v-tabs-slider>
              <v-tab href="#tab-1" v-on:click="activetab=1">Outcome
                <v-icon>description</v-icon>
              </v-tab>
              <v-tab href="#tab-2" v-on:click="activetab=2">Statistics
                <v-icon>timeline</v-icon>
              </v-tab>
            </v-tabs>
          </v-card>
          <div class="content">
            <div v-if="activetab === 1" class="tab-content">
              <v-card flat>
                <v-card-text>
                  <p>The computations were successful... just kidding, everything failed!</p>
                </v-card-text>
              </v-card>
            </div>
            <div v-if="activetab === 2" class="tab-content">
              <v-card flat>
                <v-card-text>
                  <p>Every single core of our cpus burnt down during the calculations :)</p>
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
import { isNil } from 'lodash';
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
          this.runtime = this.msToTime(moment(this.execution.startedAt).diff(terminated));
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
    this.getExecutionById(this.executionId).then((execution) => {
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

</style>
