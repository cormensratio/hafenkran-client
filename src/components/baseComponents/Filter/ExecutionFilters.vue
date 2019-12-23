<template>
  <base-filter-component @applyFilters="applyFilters($event)"
                         @quickSearch="quickSearch($event)"
                          :filters="executionFilters"
  >
  </base-filter-component>
</template>

<script>
import { mapGetters } from 'vuex';
import { uniq, map } from 'lodash';
import FilterUsersCombobox from './FilterUsersCombobox';
import BaseFilterComponent from './BaseFilterComponent';
import FilterDateTime from './FilterDateTime';

export default {
  name: 'ExecutionFilters',
  components: { FilterDateTime, BaseFilterComponent, FilterUsersCombobox },
  data() {
    return {
      filters: {
        name: {
          label: 'Name',
          value: 'name',
          type: 'basic',
          filterOptions: [],
        },
        status: {
          label: 'Status',
          value: 'status',
          type: 'basic',
          filterOptions: [],
        },
        user: {
          label: 'User',
          value: '',
          type: 'user',
        },
        startTime: {
          label: 'Started at',
          value: 'startedAt',
          type: 'dateTime',
        },
        cancelTime: {
          label: 'Canceled at',
          value: 'terminatedAt',
          type: 'dateTime',
        },
      },
    };
  },
  computed: {
    ...mapGetters(['user', 'executions', 'userList']),
    nameOptions() {
      return uniq(map(this.executions, this.filters.name.value));
    },
    statusOptions() {
      return uniq(map(this.executions, this.filters.status.value));
    },
    startTimeOptions() {
      return uniq(map(this.executions, this.filters.startTime.value));
    },
    cancelTimeOptions() {
      return uniq(map(this.executions, this.filters.cancelTime.value));
    },
    executionFilters() {
      this.updateFilterOptions();
      return this.filters;
    },
  },
  methods: {
    applyFilters(appliedFilters) {
      this.$emit('applyFilters', appliedFilters);
    },
    quickSearch(input) {
      this.$emit('quickSearch', input);
    },
    updateFilterOptions() {
      this.filters.name.filterOptions = this.nameOptions;
      this.filters.status.filterOptions = this.statusOptions;
    },
  },
};
</script>

<style scoped>
</style>
