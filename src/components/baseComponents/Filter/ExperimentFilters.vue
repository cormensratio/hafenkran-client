<template>
  <base-filter-component @applyFilters="applyFilters($event)"
                         :filters="experimentFilters"
                         @quickSearch="quickSearch($event)"
  >
  </base-filter-component>
</template>

<script>
import { mapGetters } from 'vuex';
import { uniq, map } from 'lodash';
import BaseFilterComponent from './BaseFilterComponent';

export default {
  name: 'ExperimentFilters',
  components: { BaseFilterComponent },
  data() {
    return {
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
        owner: {
          label: 'User',
          value: 'owner',
          filterOptions: [],
        },
      },
    };
  },
  computed: {
    ...mapGetters(['user', 'experiments', 'userList']),
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
    userOptions() {
      return map(this.userList, user => user.name);
    },
  },
  methods: {
    updateFilterOptions() {
      this.filters.name.filterOptions = this.nameOptions;
      this.filters.size.filterOptions = this.sizeOptions;
      this.filters.owner.filterOptions = this.userOptions;
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
