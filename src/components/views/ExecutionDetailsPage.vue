<template>
  <base-page>
    <template slot="body">
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
import BasePage from '../baseComponents/BasePage';
import StatusCell from '../baseComponents/StatusCell';


export default {
  name: 'ExecutionDetailsPage',
  components: { StatusCell, BasePage },
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
</style>
