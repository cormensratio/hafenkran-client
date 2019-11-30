<template>
  <base-page>
    <template slot="body">
      <div>

      </div>
      <div>
        <v-btn @click="this.getLogs()">Click</v-btn>
        <p>{{ logs }}</p>
      </div>
    </template>
  </base-page>
</template>

<script>
import { isNil } from 'lodash';
import { mapActions } from 'vuex';
import BasePage from '../baseComponents/BasePage';
import ExecutionResultService from '../../service/ExecutionDetailService';


export default {
  name: 'ExecutionDetailsPage',
  components: { BasePage },
  data() {
    return {
      execution: {},
      logs: '',
    };
  },
  props: {
    executionId: String,
  },
  methods: {
    ...mapActions(['getExecutionById']),
  },
  created() {
    this.getExecutionById(this.executionId).then((execution) => {
      if (!isNil(execution)) {
        this.execution = execution;
      }
    });
  },
  getLogs() {
    this.logs = ExecutionResultService.getExecutionResultsbyId();
  },
};
</script>

<style scoped>

</style>
