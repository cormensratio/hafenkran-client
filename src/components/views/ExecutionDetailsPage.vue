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
               <v-card flat col>
                 <v-card-text align="right">Cancel execution</v-card-text>
               </v-card>
            </v-flex>
            <v-flex>
              <v-card class="top_icons" flat align="left">
              <v-btn icon :disabled="execution.status !== 'RUNNING'"
              @click="terminateExecution(execution.id)">
                <v-icon class="top_icons">cancel</v-icon>
              </v-btn>
              </v-card>
            </v-flex>
            <v-flex>
               <v-card flat>
                 <v-card-text align="right">Download logs</v-card-text>
               </v-card>
            </v-flex>
            <v-flex class="top_icons">
               <v-card class="top_icons" flat align="left">
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
              <span>Start Date: {{ getTimeStamp(execution.createdAt) }}</span>
              <v-spacer></v-spacer>
              <span>Runtime: {{runtime}}</span>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
        </v-container>
      </div>
      <div>

      </div>
    </template>
  </base-page>
</template>

<script>
import { isNil } from 'lodash';
import { mapActions } from 'vuex';
import BasePage from '../baseComponents/BasePage';
import { timeStampMixin } from '../../mixins/TimeStamp';


export default {
  name: 'ExecutionDetailsPage',
  components: { BasePage },
  mixins: [timeStampMixin],
  data() {
    return {
      execution: {},
      runtime: Number,
    };
  },
  props: {
    executionId: String,
  },
  methods: {
    ...mapActions(['getExecutionById', 'terminateExecution']),
    calculateRuntime() {
      this.execution.terminatedAt = new Date();
      this.runtime = this.msToTime(this.execution.terminatedAt
        - this.execution.startedAt);
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
.top_icons{
  top: 4px;
  right: 15px;
}
</style>
