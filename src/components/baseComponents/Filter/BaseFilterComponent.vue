<template>
  <v-card>
    <v-card-title>
      <span class="filter-title ml-4">Additional filters:</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-layout justify-start>
          <v-flex v-for="(filter, id) in filters" :key="id">
            <filter-combobox ref="filter"
                             :items="filter.filterOptions"
                             :label="filter.label"
                             :value="filter.value"
                             @update="applyFilter($event)"
                             v-if="isVisible(filter.requiresAdmin) && (filter.type === 'basic')"
            >
            </filter-combobox>
            <filter-date-time ref="filter"
                              :label="filter.label"
                              :value="filter.value"
                              @update="applyFilter"
                              v-else-if="(filter.type === 'dateTime') &&
                              isVisible(filter.requiresAdmin)"
            >
            </filter-date-time>
            <filter-users-combobox ref="filter"
                                   :label="filter.label"
                                   @update="applyFilter($event)"
                                   v-else-if="(filter.type === 'user') &&
                                   isVisible(filter.requiresAdmin)"
            >
            </filter-users-combobox>
          </v-flex>
          <slot name="customFilter"></slot>
          <v-flex>
            <v-btn class="m-2" @click="clearFilters">
              Clear all filters
            </v-btn>
          </v-flex>
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
import FilterDateTime from './FilterDateTime';
import FilterUsersCombobox from './FilterUsersCombobox';

export default {
  name: 'BaseFilterComponent',
  components: { FilterUsersCombobox, FilterDateTime, FilterCombobox },
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
      requiresAdmin: Boolean,
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
      if (!isNil(this.$refs.filter) && this.$refs.filter.length > 0) {
        forEach(this.$refs.filter, box => box.clearSelected());
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
