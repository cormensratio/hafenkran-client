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
                  <tr @click="showContextMenu($event, props.item)">
                    <td class="text-xs-left">{{ props.item.name }}</td>
                    <td class="text-xs-left" v-if="user.isAdmin">
                      {{ getUserNameOfExperiment(props.item.ownerId) }}
                    </td>
                    <td class="text-xs-left">{{ getTimeStamp(props.item.createdAt)}}</td>
                    <td>
                      <file-size-cell :size="props.item.size"></file-size-cell>
                    </td>
                  </tr>
                </template>
              </v-data-table>
            </v-card>
          </v-flex>
        </v-layout>
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
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { isNil, filter } from 'lodash';
import BasePage from '../baseComponents/BasePage';
import TimeStampMixin from '../../mixins/TimeStamp';
import StartExperimentMenu from '../baseComponents/StartExperimentMenu';
import FileSizeCell from '../baseComponents/FileSizeCell';
import BaseListHeader from '../baseComponents/BaseListHeader';
import ExperimentFilters from '../baseComponents/Filter/ExperimentFilters';
import FilterMixin from '../../mixins/FilterMixin';


export default {
  name: 'ExperimentListPage',
  components: { FileSizeCell, ExperimentFilters, BaseListHeader, BasePage, StartExperimentMenu },
  mixins: [TimeStampMixin, FilterMixin],

  computed: {
    ...mapGetters(['experiments', 'user', 'userList']),
  },
  data() {
    return {
      search: '',
      showDetails: false,
      selectedExperiment: {},
      menuPosX: 0,
      menuPosY: 0,
      showMenu: false,
      ownerColumn: {
        text: 'Owner',
        value: 'ownerId',
        sortable: true,
      },
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
    ...mapActions(['fetchExperiments', 'fetchExecutionsByExperimentId', 'triggerSnack', 'fetchUserList']),
    ...mapMutations(['showSnack']),
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
    applyFilters(filters) {
      if (!isNil(filters)) {
        // Use object.assign so vue notices filters object was updated
        this.filters = Object.assign({}, filters);
      }
    },
    quickSearch(input) {
      this.search = input;
    },
    getUserNameOfExperiment(ownerId) {
      if (!isNil(ownerId)) {
        const matching = filter(this.userList, user => user.id === ownerId);

        if (!isNil(matching) && matching.length > 0) {
          return matching[0].name;
        }
      }
      return '';
    },
  },
  watch: {
    experiments() {
      this.items = this.experiments;
    },
  },
  created() {
    this.fetchUserList();
    this.fetchExperiments();
    this.$nextTick(() => {
      this.items = this.experiments;
    });
    if (this.user.isAdmin) {
      this.headers.splice(-2, 0, {
        text: 'Owner',
        value: 'name',
        sortable: true });
    }
  },
};
</script>

<style scoped>
</style>
