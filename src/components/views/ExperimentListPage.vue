<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <base-page>
    <template slot="body">
      <v-container>
        <v-layout column>
          <v-flex>
            <v-card>
              <base-list-header title="Experiments">
                <template slot="expansion-body">
                  <ExperimentFilters @applyFilters="applyFilters($event)"
                                    @quickSearch="quickSearch($event)"
                  >
                  </ExperimentFilters>
                </template>
              </base-list-header>
              <v-data-table
                :headers="headers"
                :items="filteredItems"
                :search="search"
                class="elevation-1"
              ><template v-slot:items="props">
                <tr @click="toggleDetails(props.item)">
                  <td class="text-xs-left">{{ props.item.name }}</td>
                  <td class="text-xs-left">{{ getTimeStamp(props.item.createdAt)}}</td>
                  <td class="text-xs-left">{{ props.item.size }} Byte</td>
                </tr>
              </template>
              </v-data-table>
            </v-card>
          </v-flex>
          <v-flex v-if="showDetails">
            <div class="mt-4">
              <StartExperimentMenu @close="closeDetails"
                                   :experiment="selectedExperiment"
              >
              </StartExperimentMenu>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </template>
  </base-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { isNil } from 'lodash';
import BasePage from '../baseComponents/BasePage';
import { timeStampMixin } from '../../mixins/TimeStamp';
import StartExperimentMenu from '../baseComponents/StartExperimentMenu';
import BaseListHeader from '../baseComponents/BaseListHeader';
import ExperimentFilters from '../baseComponents/Filter/ExperimentFilters';
import FilterMixin from '../../mixins/FilterMixin';


export default {
  name: 'ExperimentListPage',
  components: { ExperimentFilters, BaseListHeader, BasePage, StartExperimentMenu },
  mixins: [timeStampMixin, FilterMixin],

  computed: {
    ...mapGetters(['experiments']),
  },
  data() {
    return {
      search: '',
      showDetails: false,
      selectedExperiment: {},
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
    closeDetails() {
      this.showDetails = false;
    },
    toggleDetails(experiment) {
      this.showDetails = true;
      this.selectedExperiment = experiment;
    },
    applyFilters(filters) {
      if (!isNil(filters)) {
        // Use object.assign so vue notices filters object was updated
        this.filters = Object.assign({}, filters);
      }
    },
    quickSearch(input) {
      this.search = input;
    },
  },
  created() {
    this.fetchExperiments();
    this.$nextTick(() => {
      this.items = this.experiments;
    });
  },
};
</script>

<style scoped>
</style>
