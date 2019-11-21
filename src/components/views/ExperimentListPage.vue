<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <base-page>
      <template slot="body">
        <div class="container">
          <div>
            <v-data-table
              :headers="headers"
              :items="experiments"
              :items-per-page="5"
              class="elevation-1"
            ><template v-slot:items="props">
              <tr>
                <td class="text-xs-left">{{ props.item.name }}</td>
                <td class="text-xs-left">{{ getTimeStamp(props.item.createdAt)}}</td>
                <td class="text-xs-left">{{ props.item.size }}</td>
              </tr>
            </template>
            </v-data-table>
          </div>
          <div>
            <v-btn :to="'/newexperiment'"> Upload File </v-btn>
          </div>
        </div>
      </template>
  </base-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { isNil } from 'lodash';
import BasePage from '../baseComponents/BasePage';
import { timeStampMixin } from '../../mixins/TimeStamp';

export default {
  name: 'ExperimentListPage',
  components: { BasePage },
  mixins: [timeStampMixin],
  computed: {
    ...mapGetters(['experiments']),
  },
  data() {
    return {
      headers: [
        {
          text: 'Dockerfile Name',
          align: 'left',
          sortable: true,
          value: 'name',
        },
        { text: 'Uploaded', value: 'createdAt', sortable: true },
        { text: 'Size', value: 'size', sortable: true },
      ],
    };
  },
  methods: {
    ...mapActions(['fetchExperiments', 'fetchExecutionsByExperimentId']),
    async showExecutions(experiment) {
      const experimentId = experiment.id;

      if (!isNil(experimentId)) {
        await this.fetchExecutionsByExperimentId(experimentId);
        this.$router.push('/executionlist');
      }
    },
  },
  created() {
    this.fetchExperiments();
  },
};
</script>

<style scoped>

</style>
