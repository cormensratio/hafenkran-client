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
              <td class="text-xs-left">{{ props.item.name }}</td>
              <td class="text-xs-left" v-if="user.isAdmin">
                {{ getUserNameOfResource(props.item.ownerId) }}
              </td>
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
                       @click="terminateExecution(props.item.id)">Cancel</v-btn>
                <v-btn @click="deleteExecution(props.item.id)">Delete</v-btn>
              </td>
            </template>
          </v-data-table>
        </v-card>
      </div>
    </template>
  </base-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { isNil, isEqual } from 'lodash';
import BasePage from '../baseComponents/BasePage';
import TimeStampMixin from '../../mixins/TimeStamp';
import StatusCell from '../baseComponents/StatusCell';
import BaseListHeader from '../baseComponents/BaseListHeader';
import ExecutionFilters from '../baseComponents/Filter/ExecutionFilters';
import FilterMixin from '../../mixins/FilterMixin';


export default {
  name: 'ExecutionsListPage',
  components: { ExecutionFilters, BaseListHeader, StatusCell, BasePage },
  mixins: [TimeStampMixin, FilterMixin],
  data() {
    return {
      search: '',
      headers: [
        { text: 'Experiment', sortable: true, value: 'name' },
        { text: 'Owner', value: 'ownerId', sortable: true },
        { text: 'Started at', sortable: true, value: 'createdAt' },
        { text: 'Terminated at', sortable: true, value: 'terminatedAt' },
        { text: 'Status', sortable: true, value: 'status' },
        { text: 'Actions', sortable: false },
      ],
    };
  },
  computed: {
    ...mapGetters(['executions', 'user']),
  },
  methods: {
    ...mapActions(['fetchAllExecutionsOfUser', 'terminateExecution', 'deleteExecution', 'getUserNameOfResource']),
    navigateToDetails(id) {
      this.$router.push(`/execution/${id}`);
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
