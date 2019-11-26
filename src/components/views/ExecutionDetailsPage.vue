<template>
  <base-page>
    <template slot="body">
      <div class="container">
        <v-layout>
          <v-card flat>
            <v-flex>
              <v-card flat>
              <v-card-text align="left">{{execution.name}}</v-card-text>
              <v-card-text>Cancel execution</v-card-text>
              <v-card-text>Download logs</v-card-text>
              </v-card>
            </v-flex>
          </v-card>
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
      runtime: '',
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
