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
import FilterCombobox from './FilterCombobox';
import BaseFilterComponent from './BaseFilterComponent';

export default {
  name: 'ExecutionFilters',
  components: { BaseFilterComponent, FilterCombobox },
  data() {
    return {
      filters: {
        name: {
          label: 'Name',
          value: 'name',
          filterOptions: [],
        },
        status: {
          label: 'Status',
          value: 'status',
          filterOptions: [],
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
