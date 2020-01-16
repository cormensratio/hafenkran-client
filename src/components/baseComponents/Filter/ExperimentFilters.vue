<template>
  <base-filter-component @applyFilters="applyFilters($event)"
                         @quickSearch="quickSearch($event)"
                         :filters="experimentFilters"
  >
  </base-filter-component>
</template>

<script>
import { mapGetters } from 'vuex';
import { uniq, map } from 'lodash';
import BaseFilterComponent from './BaseFilterComponent';
import FilterUsersCombobox from './FilterUsersCombobox';

export default {
  name: 'ExperimentFilters',
  components: { FilterUsersCombobox, BaseFilterComponent },
  data() {
    return {
      filters: {
        name: {
          label: 'Name',
          value: 'name',
          type: 'basic',
          filterOptions: [],
        },
        size: {
          label: 'Size',
          value: 'size',
          type: 'basic',
          filterOptions: [],
        },
        createdAt: {
          label: 'Created at',
          value: 'createdAt',
          type: 'dateTime',
        },
        user: {
          label: 'User',
          value: '',
          type: 'user',
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
      this.$emit('applyFilters', appliedFilters);
    },
    quickSearch(input) {
      this.$emit('quickSearch', input);
    },
  },
};
</script>

<style scoped>

</style>
