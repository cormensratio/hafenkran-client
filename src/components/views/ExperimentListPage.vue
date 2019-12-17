<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <base-page>
    <template slot="body">
      <v-container>
        <v-layout column>
          <v-flex>
            <v-card>
              <v-toolbar dark style="background: var(--themeColor)">
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
                  <tr @click="showContextMenu($event, props.item)">
                    <td class="text-xs-left">{{ props.item.name }}</td>
                    <td class="text-xs-left">{{ getTimeStamp(props.item.createdAt)}}</td>
                    <td class="text-xs-left">
                      <file-size-cell :size="props.item.size"></file-size-cell>
                    </td>
                  </tr>
                </template>
              </v-data-table>
            </v-card>
          </v-flex>
        </v-layout>
        <v-snackbar v-model="snackShow" auto-height top>
          {{ snack }}
          <v-btn flat color="accent" @click.native="showSnackbar = false">Close</v-btn>
        </v-snackbar>
      </v-container>
      <v-menu v-model="showMenu"
              :position-x="menuPosX"
              :position-y="menuPosY"
              :close-on-content-click="false"
              :close-on-click="false"
      >
        <StartExperimentMenu :experiment="selectedExperiment"
                             @menuClosed="closeMenu">
        </StartExperimentMenu>
      </v-menu>
    </template>
  </base-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { isNil } from 'lodash';
import BasePage from '../baseComponents/BasePage';
import TimeStampMixin from '../../mixins/TimeStamp';
import StartExperimentMenu from '../baseComponents/StartExperimentMenu';
import FileSizeCell from '../baseComponents/FileSizeCell';


export default {
  name: 'ExperimentListPage',
  components: { FileSizeCell, BasePage, StartExperimentMenu },
  mixins: [TimeStampMixin],
  computed: {
    ...mapGetters(['experiments', 'snack', 'snackShow']),
  },
  data() {
    return {
      search: '',
      showDetails: false,
      selectedExperiment: {},
      menuPosX: 0,
      menuPosY: 0,
      showMenu: false,
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
    ...mapActions(['fetchExperiments', 'fetchExecutionsByExperimentId', 'triggerSnack']),
    async showExecutions(experiment) {
      const experimentId = experiment.id;

      if (!isNil(experimentId)) {
        await this.fetchExecutionsByExperimentId(experimentId);
        this.$router.push('/executionlist');
      }
    },
    closeMenu() {
      this.showMenu = false;
    },
    showContextMenu(e, selectedExperiment) {
      this.showMenu = false;
      this.menuPosX = e.clientX;
      this.menuPosY = e.clientY;
      this.selectedExperiment = selectedExperiment;
      this.$nextTick(() => {
        this.showMenu = true;
      });
    },
  },
  created() {
    this.fetchExperiments();
  },
};
</script>

<style scoped>
</style>
