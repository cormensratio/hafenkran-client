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
                :items-per-page="5"
                class="elevation-1"
              ><template v-slot:items="props">
                <tr @click="toggleDetails(props.item)">
                  <td class="text-xs-left">{{ props.item.name }}</td>
                  <td class="text-xs-left">{{ getTimeStamp(props.item.createdAt)}}</td>
                  <td v-if="props.item.size < 1000"
                      class="text-xs-left">{{ props.item.size }} Byte</td>
                  <td v-else-if="props.item.size < 1000000"
                      class="text-xs-left">{{ (props.item.size-(props.item.size%100))/1000 }}
                    Kilobyte</td>
                  <td v-else-if="props.item.size < 1000000000" class="text-xs-left">
                    {{ (props.item.size-(props.item.size%100000))/1000000 }} Megabyte</td>
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
      <v-btn @click="fileupload=!fileupload">Upload File</v-btn>
      <div v-if="fileupload" id="upload">
        <v-hover v-slot:default="{ hover }">
          <v-card :elevation="hover ? 12 : 2">
            <file-upload></file-upload>
          </v-card>
        </v-hover>
      </div>
    </template>
  </base-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { isNil } from 'lodash';
import BasePage from '../baseComponents/BasePage';
import { timeStampMixin } from '../../mixins/TimeStamp';
import StartExperimentMenu from '../baseComponents/StartExperimentMenu';
import FileUpload from '../baseComponents/FileUpload';


export default {
  name: 'ExperimentListPage',
  components: { FileUpload, BasePage, StartExperimentMenu },
  mixins: [timeStampMixin],

  computed: {
    ...mapGetters(['experiments']),
  },
  data() {
    return {
      search: '',
      showDetails: false,
      fileupload: false,
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
  },
  created() {
    this.fetchExperiments();
  },
};
</script>

<style scoped>
  #upload {
    margin-right: 15%;
    margin-left: 15%;
    margin-bottom: 5%;
  }
</style>
