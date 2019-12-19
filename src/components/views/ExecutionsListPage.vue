<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <base-page>
    <template slot="body">
      <div class="container">
        <v-card>
          <base-list-header title="Executions">
            <template slot="expansion-body">
              <ExecutionFilters @applyFilters="applyFilters($event)"
                                @quickSearch="quickSearch($event)"
              >
              </ExecutionFilters>
            </template>
          </base-list-header>
          <v-data-table
            :headers="headers"
            :items="filteredItems"
            :search="search"
          >
            <template v-slot:items="props">
              <tr>
                <td class="text-xs-left">{{ props.item.name }}</td>
                <td class="text-xs-left">
                  {{ getTimeStamp(props.item.createdAt) || 'Not started yet' }}
                </td>
                <td class="text-xs-left">
                  {{ getTimeStamp(props.item.terminatedAt) || 'Not terminated yet'}}
                </td>
                <td class="text-xs-left">
                  <status-cell :status="props.item.status"></status-cell>
                </td>
                <td class="text-xs-left">
                  <v-btn @click="navigateToDetails(props.item.id)">Details</v-btn>
                  <v-btn :disabled="cancelButtonDisabled(props.item.status)"
                         @click="executionCancel(props.item.id)">Cancel</v-btn>
                  <v-btn class="error"
                         @click="setExecution(props.item)">Delete</v-btn>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
        <delete-dialog @deleteClicked="executionDelete"
                       @hideDialog="dialog = false"
                       :extern-execution="selectedExecution"
                       :extern-dialog="dialog"
        ></delete-dialog>
        <v-progress-circular
          size="50"
          indeterminate
          color="#106ee0"
          v-if="loading"
        />
        <v-snackbar v-model="snackShow" right>
          {{ snack }}
          <v-btn flat color="accent" @click.native="showSnackbar = false">Close</v-btn>
        </v-snackbar>
      </div>
    </template>
  </base-page>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { isNil, isEqual } from 'lodash';
import BasePage from '../baseComponents/BasePage';
import TimeStampMixin from '../../mixins/TimeStamp';
import StatusCell from '../baseComponents/StatusCell';
import BaseListHeader from '../baseComponents/BaseListHeader';
import ExecutionFilters from '../baseComponents/Filter/ExecutionFilters';
import FilterMixin from '../../mixins/FilterMixin';
import DeleteDialog from '../baseComponents/DeleteDialog';


export default {
  name: 'ExecutionsListPage',
  components: { DeleteDialog, ExecutionFilters, BaseListHeader, StatusCell, BasePage },
  mixins: [TimeStampMixin, FilterMixin],
  data() {
    return {
      search: '',
      loading: false,
      dialog: false,
      selectedExecution: {},
      headers: [
        { text: 'Experiment', sortable: true, value: 'name' },
        { text: 'Started at', sortable: true, value: 'createdAt' },
        { text: 'Terminated at', sortable: true, value: 'terminatedAt' },
        { text: 'Status', sortable: true, value: 'status' },
        { text: 'Actions', sortable: false },
      ],
    };
  },
  computed: {
    ...mapGetters(['executions', 'snack', 'snackShow']),
  },
  methods: {
    ...mapActions(['fetchAllExecutionsOfUser', 'terminateExecution', 'deleteExecution', 'triggerSnack']),
    ...mapMutations(['setSnack']),
    navigateToDetails(id) {
      this.$router.push(`/execution/${id}`);
    },
    setExecution(item) {
      this.dialog = !this.dialog;
      this.selectedExecution = item;
    },
    async executionCancel(id) {
      this.loading = true;
      const canceledExecution = await this.terminateExecution(id);
      if (canceledExecution !== null) {
        this.setSnack(`${canceledExecution.name} has been canceled`);
      } else {
        this.setSnack('Execution could not be canceled');
      }
      this.loading = false;
      this.triggerSnack();
    },
    async executionDelete(id) {
      this.dialog = false;
      this.loading = true;
      const deletedExecution = await this.deleteExecution(id);
      if (deletedExecution !== null) {
        this.setSnack(`${deletedExecution.name} has been deleted`);
      } else {
        this.setSnack('Execution could not be deleted');
      }
      this.loading = false;
      this.triggerSnack();
    },
    cancelButtonDisabled(status) {
      let disabled = true;
      if (!isNil(status)) {
        if (!isEqual(status, 'RUNNING')) {
          disabled = false;
        } else if (!isEqual(status, 'WAITING')) {
          disabled = false;
        }
      }
      return disabled;
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
    executions() {
      this.items = this.executions;
    },
  },
  created() {
    this.fetchAllExecutionsOfUser();
    this.$nextTick(() => {
      this.items = this.executions;
    });
  },
};
</script>

<style scoped>

</style>
