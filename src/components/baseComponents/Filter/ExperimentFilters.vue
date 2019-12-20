<template>
  <base-filter-component @applyFilters="applyFilters($event)"
                         :filters="experimentFilters"
                         @quickSearch="quickSearch($event)"
                         @clearFilters="clearCustomFilter()"
  >
    <template slot="customFilter">
      <filter-users-combobox ref="userFilterExperiments"
                             @update="applyUserFilters($event)"
      >
      </filter-users-combobox>
    </template>
  </base-filter-component>
</template>

<script>
import { mapGetters } from 'vuex';
import { uniq, map, extend } from 'lodash';
import BaseFilterComponent from './BaseFilterComponent';
import FilterUsersCombobox from './FilterUsersCombobox';

export default {
  name: 'ExperimentFilters',
  components: { FilterUsersCombobox, BaseFilterComponent },
  data() {
    return {
      currentFilters: {},
      currentUserFilters: {},
      filters: {
        name: {
          label: 'Name',
          value: 'name',
          filterOptions: [],
        },
        size: {
          label: 'Size',
          value: 'size',
          filterOptions: [],
        },
      },
    };
  },
  computed: {
    ...mapGetters(['user', 'experiments']),
    experimentFilters() {
      this.updateFilterOptions();
      return this.filters;
    },
    nameOptions() {
      return uniq(map(this.experiments, this.filters.name.value));
    },
    sizeOptions() {
      return uniq(map(this.experiments, this.filters.size.value));
    },
  },
  methods: {
    updateFilterOptions() {
      this.filters.name.filterOptions = this.nameOptions;
      this.filters.size.filterOptions = this.sizeOptions;
    },
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
    clearCustomFilter() {
      this.$refs.userFilterExperiments.clearSelected();
    },
  },
};
</script>

<style scoped>

</style>
