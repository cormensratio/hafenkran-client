<template>
  <base-page>
    <template slot="body">
      <div class="top">

      </div>
      <div>
        <div class="col-12 d-inline">
          <a v-on:click="activetab=1"><v-btn dark class="col-5 blue">Outcome</v-btn></a>
          <a v-on:click="activetab=2"><v-btn dark class="col-5 blue">Statistics</v-btn></a>
        </div>
        <v-divider></v-divider>
        <div class="content">
          <div v-if="activetab === 1" class="tab-content">
            <h1>Execution results</h1>
          </div>
          <div v-if="activetab === 2" class="tab-content">
            <h1>Plotted results</h1>
          </div>
        </div>
      </div>
    </template>
  </base-page>
</template>

<script>
import { isNil } from 'lodash';
import { mapActions } from 'vuex';
import BasePage from '../baseComponents/BasePage';


export default {
  name: 'ExecutionDetailsPage',
  components: { BasePage },
  data() {
    return {
      execution: {},
      activetab: 1,
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
};
</script>

<style scoped>
  .top {
    margin-top: 5%;
  }
</style>
