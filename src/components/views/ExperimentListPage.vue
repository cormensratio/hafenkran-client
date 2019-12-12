<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <base-page>
    <template slot="body">
      <v-container>
        <v-layout column>
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
              >
                <template v-slot:items="props">
                  <tr @click="toggleDetails(props.item)">
                    <td class="text-xs-left">{{ props.item.name }}</td>
                    <td class="text-xs-left">{{ getTimeStamp(props.item.createdAt)}}</td>
                    <td v-if="props.item.size < 1000"
                        class="text-xs-left">{{ props.item.size }} Byte
                    </td>
                    <td v-else-if="props.item.size < 1000000"
                        class="text-xs-left">{{ (props.item.size-(props.item.size%100))/1000 }}
                      Kilobyte
                    </td>
                    <td v-else-if="props.item.size < 1000000000" class="text-xs-left">
                      {{ (props.item.size-(props.item.size%100000))/1000000 }} Megabyte
                    </td>
                  </tr>
                </template>
                <template v-slot:footer>
                  <v-menu
                    v-model="menu" offset-y :close-on-content-click="false"
                    transition="scroll-x-transition" attach="">
                    <template v-slot:activator="{ on }">
                      <v-divider></v-divider>
                      <v-btn color="blue" dark v-on="on" class="float-left" id="addExperiButton">
                        Add Experiment
                      </v-btn>
                    </template>
                    <v-card >
                      <file-upload></file-upload>
                    </v-card>
                  </v-menu>
                </template>
              </v-data-table>
            </v-card>
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
      menu: false,
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
  #addExperiButton {
    margin-top: 0px;
    margin-bottom: 15px;
  }
</style>
