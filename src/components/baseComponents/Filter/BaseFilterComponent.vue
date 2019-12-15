<template>
  <v-card>
    <v-card-title>
      <span class="filter-title ml-4">Additional filters:</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-layout row>
            <filter-combobox v-for="(filter, id) in filters" :key="id"
                             ref="filterCombobox"
                             :items="filter.filterOptions"
                             :label="filter.label"
                             :value="filter.value"
                             class="mr-4"
                             @update="applyFilter($event)"
                             v-if="isVisible(filter.requiresAdmin)"
            >
            </filter-combobox>
        </v-layout>
        <v-layout column>
          <v-flex>
            <v-text-field append-icon="search"
                          label="Search"
                          single-line
                          @input="quickSearch()"
                          v-model="searchString"
                          class="search-field"
            >
            </v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import { forEach, isNil } from 'lodash';
import { mapGetters } from 'vuex';
import FilterCombobox from './FilterCombobox';

export default {
  name: 'BaseFilterComponent',
  components: { FilterCombobox },
  data() {
    return {
      searchString: '',
      selectedFilters: {},
    };
  },
  props: {
    filters: {
      label: String, // Label used for the combobox
      value: String, // Prop value that is filtered
      filterOptions: [], // filter options for the combobox
    },
  },
  computed: {
    ...mapGetters(['user']),
  },
  methods: {
    applyAllFilters() {
      this.$emit('applyFilters', this.selectedFilters);
    },
    applyFilter(filter) {
      if (!isNil(filter)) {
        const key = Object.keys(filter)[0];
        this.selectedFilters[key] = filter[key];
        this.$emit('applyFilters', this.selectedFilters);
      }
    },
    clearFilters() {
      if (!isNil(this.$refs.filterCombobox) && this.$refs.filterCombobox.length > 0) {
        forEach(this.$refs.filterCombobox, box => box.clearSelected());
      }
      this.selectedFilters = {};
      this.$emit('clearFilters');
      this.applyAllFilters();
    },
    quickSearch() {
      this.$emit('quickSearch', this.searchString);
    },
    isVisible(requiresAdmin) {
      return (isNil(requiresAdmin) || !requiresAdmin)
        || (requiresAdmin && this.user.isAdmin);
    },
  },
};
</script>

<style scoped>
  .filter-title {
    font-size: 14pt;
    margin-bottom: -1.5%;
  }
  .search-field {
    width: 50vh;
  }
</style>
