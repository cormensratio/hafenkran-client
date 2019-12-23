<template>
  <base-filter-component @applyFilters="applyFilters($event)"
                         @quickSearch="quickSearch($event)"
                          :filters="executionFilters"
                         @clearFilters="clearCustomFilter()"
  >
    <template slot="customFilter">
      <v-flex>
        <filter-users-combobox ref="userFilterExecutions"
                               @update="applyUserFilters($event)"
        >
        </filter-users-combobox>
      </v-flex>
      <v-flex>
        <filter-date-time ref="startTimeFilter"
                          label="Terminated at"
                          :items="terminatedTimeOptions"
        >
        </filter-date-time>
      </v-flex>
      <v-flex>
        <filter-date-time ref="terminatedTimeFilter"
                          label="Started at"
                          :items="terminatedTimeOptions"
        >
        </filter-date-time>
      </v-flex>
    </template>
  </base-filter-component>
</template>

<script>
import { mapGetters } from 'vuex';
import { uniq, map, extend } from 'lodash';
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
    startTimeOptions() {
      return uniq(map(this.executions, () => 'startedAt'));
    },
    terminatedTimeOptions() {
      return uniq(map(this.executions, () => 'terminatedAt'));
    },
    executionFilters() {
      this.updateFilterOptions();
      return this.filters;
    },
  },
  methods: {
    applyFilters(appliedFilters) {
      this.currentFilters = appliedFilters;
      const output = extend(this.currentFilters, this.currentUserFilters);
      this.$emit('applyFilters', output);
    },
    applyUserFilters(appliedUserFilters) {
      this.currentUserFilters = appliedUserFilters;
      const output = extend(this.currentFilters, this.currentUserFilters);
      this.$emit('applyFilters', output);
    },
    quickSearch(input) {
      this.$emit('quickSearch', input);
    },
    updateFilterOptions() {
      this.filters.name.filterOptions = this.nameOptions;
      this.filters.status.filterOptions = this.statusOptions;
    },
    clearCustomFilter() {
      this.$refs.userFilterExecutions.clearSelected();
      this.$refs.startTimeFilter.clear();
      this.$refs.terminatedTimeFilter.clear();
    },
  },
};
</script>

<style scoped>
</style>
