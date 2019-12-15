<template>
  <base-filter-component @applyFilters="applyFilters($event)"
                          :filters="executionFilters">
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
          filterOptions: this.nameOptions,
        },
        user: {
          label: 'User',
          value: 'user',
          filterOptions: [],
        },
        status: {
          label: 'Status',
          value: 'status',
          filterOptions: this.statusOptions,
        },
      },
    };
  },
  computed: {
    ...mapGetters(['user', 'executions']),
    nameOptions() {
      return uniq(map(this.executions, 'name'));
    },
    statusOptions() {
      return uniq(map(this.executions, 'status'));
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
    updateFilterOptions() {
      this.filters.name.filterOptions = this.nameOptions;
      this.filters.status.filterOptions = this.statusOptions;
    },
  },
};
</script>

<style scoped>
</style>
