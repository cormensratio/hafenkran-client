<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <base-page>
    <template slot="body">
      <v-container>
        <v-layout column>
          <v-flex>
            <v-card>
              <v-toolbar dark color="blue">
                <span class="title">Experiments</span>
                <v-spacer></v-spacer>
                <v-text-field append-icon="search"
                              label="Search"
                              single-line
                              v-model="search"
                >
                </v-text-field>
              </v-toolbar>
              <v-data-table
                :headers="headers"
                :items="experiments"
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
              <StartExperimentMenu @close="closeDetails" @notstarted="showSnack"
                                   :experiment="selectedExperiment"
              >
              </StartExperimentMenu>
            </div>
          </v-flex>
        </v-layout>
        <v-snackbar v-model="showSnackbar" auto-height top>
          {{ snack }}
          <v-btn flat color="accent" @click.native="showSnackbar = false">Close</v-btn>
        </v-snackbar>
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


export default {
  name: 'ExperimentListPage',
  components: { BasePage, StartExperimentMenu },
  mixins: [timeStampMixin],

  computed: {
    ...mapGetters(['experiments', 'snack']),
  },
  data() {
    return {
      search: '',
      showDetails: false,
      selectedExperiment: {},
      showSnackbar: false,
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
    showSnack() {
      this.showSnackbar = true;
    },
    closeDetails() {
      this.showDetails = false;
    },
    toggleDetails(experiment) {
      this.showDetails = !this.showDetails;
      this.selectedExperiment = experiment;
    },
  },
  created() {
    this.fetchExperiments();
  },
};
</script>

<style scoped>
</style>
