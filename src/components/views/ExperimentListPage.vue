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
              >
                <template v-slot:items="props">
                  <tr>
                    <td class="text-xs-left">{{ props.item.name }}</td>
                    <td class="text-xs-left" v-if="user.isAdmin">
                      {{ getUserNameFromId(props.item.ownerId) }}
                    </td>
                    <td class="text-xs-left">{{ getTimeStamp(props.item.createdAt)}}</td>
                    <td>
                      <file-size-cell :size="props.item.size"></file-size-cell>
                    </td>
                    <td class="justify-center action-container">
                      <v-tooltip bottom class="mr-1">
                        <template v-slot:activator="{ on }">
                          <v-icon @click="showStartExperimentMenu(props.item)"
                                  color="black" dark v-on="on">play_arrow
                          </v-icon>
                        </template>
                        <span>Start Execution</span>
                      </v-tooltip>
                      <v-tooltip bottom class="mr-1">
                        <template v-slot:activator="{ on }">
                          <v-icon @click="showShareDialog(props.item)"
                                  color="black" dark v-on="on">share
                          </v-icon>
                        </template>
                        <span>Share Experiment</span>
                      </v-tooltip>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-icon @click="setExperiment(props.item)"
                                  color="red" dark v-on="on">delete
                          </v-icon>
                        </template>
                        <span>Delete this Experiment</span>
                      </v-tooltip>
                    </td>
                  </tr>
                </template>
              </v-data-table>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <delete-dialog @deleteClicked="experimentDelete"
                     @hideDialog="deleteDialog = false"
                     :extern-execution="selectedExperiment.id"
                     :extern-dialog="deleteDialog"
                     :header-message="'Are you sure you want to delete this Experiment?'"
      />
      <v-dialog v-model="showMenu" width="400">
        <StartExperimentMenu :experiment="selectedExperiment"
                             @menuClosed="closeMenus"
        >
        </StartExperimentMenu>
      </v-dialog>
      <v-dialog v-if="showShareMenu" v-model="showShareMenu" width="400">
        <ShareMenu :experiment="selectedExperiment"
                   @menuClosed="closeMenus"
        ></ShareMenu>
      </v-dialog>
    </template>
  </base-page>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { isNil } from 'lodash';
import BasePage from '../baseComponents/BasePage';
import TimeStampMixin from '../../mixins/TimeStamp';
import StartExperimentMenu from '../baseComponents/StartExperimentMenu';
import FileSizeCell from '../baseComponents/FileSizeCell';
import BaseListHeader from '../baseComponents/BaseListHeader';
import ExperimentFilters from '../baseComponents/Filter/ExperimentFilters';
import FilterMixin from '../../mixins/FilterMixin';
import ShareMenu from '../baseComponents/ShareMenu';
import UsersMixin from '../../mixins/UsersMixin';
import DeleteDialog from '../baseComponents/DeleteDialog';


export default {
  name: 'ExperimentListPage',
  components: {
    DeleteDialog,
    ShareMenu,
    FileSizeCell,
    ExperimentFilters,
    BaseListHeader,
    BasePage,
    StartExperimentMenu,
  },
  mixins: [TimeStampMixin, FilterMixin, UsersMixin],
  data() {
    return {
      search: '',
      selectedExperiment: {},
      showMenu: false,
      showShareMenu: false,
      deleteDialog: false,
      headers: [
        { text: 'Dockerfile Name', value: 'name', sortable: true },
        { text: 'Owner', value: 'ownerId', sortable: true },
        { text: 'Uploaded', value: 'createdAt', sortable: true },
        { text: 'Size', value: 'size', sortable: true },
        { text: 'Actions', sortable: false, align: 'center', width: '10%' },
      ],
    };
  },
  computed: {
    ...mapGetters(['experiments', 'user']),
  },
  methods: {
    ...mapActions(['fetchExperiments', 'fetchExecutionsByExperimentId', 'triggerSnack', 'fetchUserList']),
    ...mapMutations(['showSnack']),
    setExperiment(experiment) {
      this.deleteDialog = true;
      this.selectedExperiment = experiment;
    },
    async experimentDelete(id) {
      if (!isNil(id)) {
        this.deleteDialog = false;
        const deletedExperiment = await this.deleteExperiment(id);
        if (deletedExperiment !== null) {
          this.setSnack(`${deletedExperiment.name} has been deleted`);
        } else {
          this.setSnack('Experiment could not be deleted');
        }
        this.triggerSnack();
      }
    },
    closeMenus() {
      this.showShareMenu = false;
      this.showMenu = false;
    },
    showStartExperimentMenu(selectedExperiment) {
      this.selectedExperiment = selectedExperiment;
      this.$nextTick(() => {
        this.showMenu = true;
      });
    },
    showShareDialog(selectedExperiment) {
      this.selectedExperiment = selectedExperiment;
      this.$nextTick(() => {
        this.showShareMenu = true;
      });
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
  watch: {
    experiments() {
      this.items = this.experiments;
    },
  },
  async created() {
    await this.fetchExperiments();
    this.$nextTick(() => {
      this.items = this.experiments;
    });
    this.fetchUserList();
  },
};
</script>

<style scoped>
  .action-container {
    display: flex;
    justify-content: space-between;
  }
</style>
